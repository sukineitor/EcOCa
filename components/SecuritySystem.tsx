import React, { useEffect, useState } from 'react';

interface SecurityEvent {
  timestamp: string;
  eventType: string;
  data: any;
  sessionId: string;
}

interface SecurityMetrics {
  totalEvents: number;
  suspiciousActivities: number;
  lastActivity: string;
  riskScore: number;
}

const SecuritySystem: React.FC = () => {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalEvents: 0,
    suspiciousActivities: 0,
    lastActivity: '',
    riskScore: 0
  });

  useEffect(() => {
    const analyzeSecurityLogs = () => {
      const logs: SecurityEvent[] = JSON.parse(localStorage.getItem('ecocash_security_logs') || '[]');
      
      const suspiciousEvents = logs.filter(log => 
        log.eventType.includes('FAILED') || 
        log.eventType.includes('ERROR') ||
        log.eventType.includes('BLOCKED')
      );

      const riskScore = calculateRiskScore(logs, suspiciousEvents);

      setMetrics({
        totalEvents: logs.length,
        suspiciousActivities: suspiciousEvents.length,
        lastActivity: logs.length > 0 ? logs[logs.length - 1].timestamp : '',
        riskScore
      });
    };

    analyzeSecurityLogs();
    const interval = setInterval(analyzeSecurityLogs, 30000);

    return () => clearInterval(interval);
  }, []);

  const calculateRiskScore = (allLogs: SecurityEvent[], suspiciousLogs: SecurityEvent[]): number => {
    if (allLogs.length === 0) return 0;
    
    const suspiciousRatio = suspiciousLogs.length / allLogs.length;
    const recentSuspicious = suspiciousLogs.filter(log => 
      new Date(log.timestamp).getTime() > Date.now() - 3600000
    ).length;

    return Math.min(100, (suspiciousRatio * 50) + (recentSuspicious * 10));
  };

  const getRiskLevel = (score: number): { level: string; color: string } => {
    if (score < 20) return { level: 'Bajo', color: 'text-lime-400' };
    if (score < 50) return { level: 'Medio', color: 'text-yellow-400' };
    if (score < 80) return { level: 'Alto', color: 'text-orange-400' };
    return { level: 'Crítico', color: 'text-red-400' };
  };

  const riskLevel = getRiskLevel(metrics.riskScore);

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🛡️</span>
        <h3 className="text-lg font-black text-white">Centro de Seguridad</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/40 rounded-xl p-4">
          <span className="text-[10px] font-black text-white/40 uppercase">Eventos Totales</span>
          <p className="text-2xl font-black text-white">{metrics.totalEvents}</p>
        </div>
        
        <div className="bg-black/40 rounded-xl p-4">
          <span className="text-[10px] font-black text-white/40 uppercase">Actividades Sospechosas</span>
          <p className="text-2xl font-black text-red-400">{metrics.suspiciousActivities}</p>
        </div>
      </div>

      <div className="bg-black/40 rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black text-white/40 uppercase">Puntuación de Riesgo</span>
          <span className={`text-sm font-black ${riskLevel.color}`}>{riskLevel.level}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              metrics.riskScore < 20 ? 'bg-lime-400' :
              metrics.riskScore < 50 ? 'bg-yellow-400' :
              metrics.riskScore < 80 ? 'bg-orange-400' : 'bg-red-400'
            }`}
            style={{ width: `${metrics.riskScore}%` }}
          />
        </div>
        <p className="text-[9px] text-white/20 mt-2 font-bold uppercase">
          Score: {metrics.riskScore}/100
        </p>
      </div>

      {metrics.lastActivity && (
        <div className="bg-black/40 rounded-xl p-4">
          <span className="text-[10px] font-black text-white/40 uppercase">Última Actividad</span>
          <p className="text-sm font-bold text-white/60">
            {new Date(metrics.lastActivity).toLocaleString()}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-sm font-black text-white/80">Medidas Activas:</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-lime-400">✓</span>
            <span className="text-white/60">OAuth2 con Google</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-lime-400">✓</span>
            <span className="text-white/60">Detección de Ad-Block</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-lime-400">✓</span>
            <span className="text-white/60">Monitoreo de IP y User-Agent</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-lime-400">✓</span>
            <span className="text-white/60">Registro de Eventos de Seguridad</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySystem;
