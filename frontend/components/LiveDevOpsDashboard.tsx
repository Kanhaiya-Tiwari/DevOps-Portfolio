'use client';

import { useEffect, useMemo, useState } from 'react';
import { Activity, Boxes, Cloud, GitBranch, Server } from 'lucide-react';

type MetricsPayload = {
  timestamp?: string;
  pipelineStages?: Record<string, string>;
  cluster?: {
    pods: number;
    readyPods: number;
    deployments: number;
  };
  monitoring?: {
    cpu: number;
    memory: number;
    latency: number;
    error: number;
  };
  log?: string;
};

const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

const stageColor: Record<string, string> = {
  queued: 'bg-slate-500/40 text-slate-200 border-slate-400/40',
  running: 'bg-cyan-500/30 text-cyan-100 border-cyan-300/40',
  passed: 'bg-emerald-500/30 text-emerald-100 border-emerald-300/40',
  failed: 'bg-rose-500/30 text-rose-100 border-rose-300/40',
};

export default function LiveDevOpsDashboard() {
  const [connected, setConnected] = useState(false);
  const [metrics, setMetrics] = useState<MetricsPayload>({
    pipelineStages: { Build: 'queued', Test: 'queued', Scan: 'queued', Deploy: 'queued' },
    cluster: { pods: 0, readyPods: 0, deployments: 0 },
    monitoring: { cpu: 0, memory: 0, latency: 0, error: 0 },
  });
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const wsUrl = backendBase.replace('http://', 'ws://').replace('https://', 'wss://') + '/devops/ws';
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => setConnected(true);
    socket.onclose = () => setConnected(false);
    socket.onerror = () => setConnected(false);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as MetricsPayload & { heartbeat?: string };
        if (data.heartbeat) {
          return;
        }
        setMetrics((prev) => ({
          ...prev,
          ...data,
          cluster: data.cluster || prev.cluster,
          monitoring: data.monitoring || prev.monitoring,
          pipelineStages: data.pipelineStages || prev.pipelineStages,
        }));
        if (data.log) {
          setLogs((prev) => [data.log || '', ...prev].slice(0, 20));
        }
      } catch {
        // Ignore malformed telemetry chunks.
      }
    };

    return () => socket.close();
  }, []);

  const health = useMemo(() => {
    const m = metrics.monitoring || { cpu: 0, memory: 0, latency: 0, error: 0 };
    if (m.error > 1.5 || m.cpu > 85) return 'warning';
    if (m.error > 2.2 || m.cpu > 92) return 'critical';
    return 'healthy';
  }, [metrics.monitoring]);

  return (
    <section id="dashboard" className="frost-card reveal mb-10 p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="kicker">Live DevOps Dashboard</p>
          <h3 className="text-xl font-semibold text-white md:text-2xl">Operational command center</h3>
        </div>
        <div className={`status-dot ${connected ? 'status-live' : 'status-offline'}`}>
          {connected ? 'WebSocket live' : 'WebSocket reconnecting'}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="inner-card">
          <p className="inner-title"><GitBranch size={15} /> CI/CD Pipeline</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {Object.entries(metrics.pipelineStages || {}).map(([name, status]) => (
              <div key={name} className={`rounded-xl border px-3 py-2 text-sm ${stageColor[status] || stageColor.queued}`}>
                <div className="font-semibold">{name}</div>
                <div className="text-xs uppercase tracking-wider">{status}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="inner-card">
          <p className="inner-title"><Boxes size={15} /> Kubernetes Simulation</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
            <div className="metric-cell"><span>Pods</span><strong>{metrics.cluster?.pods ?? 0}</strong></div>
            <div className="metric-cell"><span>Ready</span><strong>{metrics.cluster?.readyPods ?? 0}</strong></div>
            <div className="metric-cell"><span>Deployments</span><strong>{metrics.cluster?.deployments ?? 0}</strong></div>
          </div>
        </div>

        <div className="inner-card">
          <p className="inner-title"><Activity size={15} /> Monitoring (Prometheus style)</p>
          <div className="mt-3 space-y-3 text-sm">
            <MetricRow label="CPU" value={metrics.monitoring?.cpu ?? 0} unit="%" />
            <MetricRow label="Memory" value={metrics.monitoring?.memory ?? 0} unit="%" />
            <MetricRow label="Latency" value={metrics.monitoring?.latency ?? 0} unit="ms" />
            <MetricRow label="Error rate" value={metrics.monitoring?.error ?? 0} unit="%" />
          </div>
          <div className="mt-4 text-xs text-slate-300">System health: <span className="font-semibold uppercase text-white">{health}</span></div>
        </div>

        <div className="inner-card">
          <p className="inner-title"><Server size={15} /> Logs Viewer</p>
          <div className="mt-3 h-40 overflow-auto rounded-lg border border-white/10 bg-slate-950/65 p-2 font-mono text-xs text-slate-200">
            {logs.length === 0 ? (
              <div className="text-slate-400">Waiting for events...</div>
            ) : (
              logs.map((line, idx) => (
                <div key={`${line}-${idx}`} className="mb-1 border-b border-white/5 pb-1">{line}</div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="inner-card">
          <p className="inner-title"><Cloud size={15} /> AWS Architecture Preview</p>
          <div className="aws-diagram mt-3">
            <div>ALB</div>
            <div>EC2 ASG</div>
            <div>RDS</div>
            <div>S3</div>
          </div>
        </div>
        <div className="inner-card">
          <p className="inner-title">Terraform Snapshot</p>
          <pre className="mt-3 overflow-auto rounded-lg border border-white/10 bg-slate-950/65 p-3 text-xs text-cyan-200">
{`module "platform" {
  source = "./infra/aws"
  environment = "prod"
  eks_node_groups = 3
  rds_engine = "postgres"
  enable_alb = true
}`}
          </pre>
        </div>
      </div>
    </section>
  );
}

function MetricRow({ label, value, unit }: { label: string; value: number; unit: string }) {
  const width = `${Math.max(4, Math.min(100, value))}%`;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
        <span>{label}</span>
        <span>{value.toFixed(1)} {unit}</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400" style={{ width }} />
      </div>
    </div>
  );
}
