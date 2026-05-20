import React, { useState, useRef } from 'react';
import { Upload, FileText, PenTool, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

type DocStatus = 'Draft' | 'In Review' | 'Signed';

export default function DocumentChamber() {
  const [status, setStatus] = useState<DocStatus>('Draft');
  const [fileName, setFileName] = useState<string | null>(null);
  
  // Signature Pad State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Bulletproof Canvas Drawing Logic using native offsets
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = 'hsl(var(--primary))'; // Draw in the primary theme color!
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // Demo-Optimized Upload: Bypasses file explorer for a smoother video recording
  const handleDemoUpload = () => {
    setFileName('Nexus_Seed_Term_Sheet_v2.pdf');
    setStatus('In Review');
  };

  const handleSignDocument = () => {
    if (hasSignature) setStatus('Signed');
  };

  return (
    <Card className="flex flex-col h-full min-h-[70vh] bg-background border-border shadow-lg rounded-xl overflow-hidden animate-fade-in">
      
      {/* Header */}
      <div className="p-5 border-b border-border flex justify-between items-center bg-secondary/20">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <FileText size={20} className="text-primary" />
          Contract Chamber
        </h2>
        <Badge 
          variant={status === 'Signed' ? 'success' : status === 'In Review' ? 'warning' : 'gray'}
          className="text-xs uppercase tracking-wider font-bold px-3 py-1 shadow-sm"
        >
          {status}
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 custom-scrollbar">
        
        {/* State 1: Upload Section */}
        {!fileName ? (
          <div className="flex-1 border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-xl flex flex-col items-center justify-center p-8 text-center bg-secondary/10 group">
            <div className="p-4 bg-background rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <Upload size={32} className="text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Upload Term Sheet</h3>
            <p className="text-sm text-foreground/60 mb-6">PDF, DOCX, or Images up to 10MB</p>
            
            {/* Demo optimized button */}
            <Button onClick={handleDemoUpload}>
              Select File to Upload
            </Button>
          </div>
        ) : (
          /* State 2: Document Preview Mock (Upgraded to Premium CSS) */
          <div className="flex-1 flex flex-col gap-4 animate-fade-in">
            <div className="flex items-center justify-between bg-secondary/40 p-3.5 rounded-lg border border-border/50">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText size={20} className="text-primary flex-shrink-0" />
                <span className="font-medium text-foreground text-sm truncate">{fileName}</span>
              </div>
              <button 
                onClick={() => { setFileName(null); setStatus('Draft'); clearSignature(); }}
                className="text-red-500 hover:bg-red-500/10 p-1.5 rounded-md transition-colors"
              >
                <XCircle size={18} />
              </button>
            </div>
            
            {/* Premium Fake PDF Viewer */}
            <div className="flex-1 bg-secondary/10 border border-border rounded-xl p-8 shadow-inner overflow-hidden relative min-h-[250px]">
              <div className="w-3/4 h-3 bg-foreground/20 rounded mb-5"></div>
              <div className="w-full h-3 bg-foreground/10 rounded mb-3"></div>
              <div className="w-full h-3 bg-foreground/10 rounded mb-3"></div>
              <div className="w-5/6 h-3 bg-foreground/10 rounded mb-6"></div>
              <div className="w-1/2 h-3 bg-foreground/20 rounded mb-4"></div>
              <div className="w-full h-3 bg-foreground/10 rounded mb-3"></div>
              <div className="w-4/5 h-3 bg-foreground/10 rounded mb-3"></div>
              
              <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[1px]">
                <span className="text-foreground font-semibold bg-background/90 px-4 py-2 rounded-full shadow-md border border-border text-sm">
                  Encrypted Preview
                </span>
              </div>
            </div>
          </div>
        )}

        {/* State 3: E-Signature Section */}
        {fileName && status !== 'Signed' && (
          <div className="border border-border rounded-xl p-5 bg-background shadow-sm animate-slide-up">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <PenTool size={16} className="text-primary" /> Execute Signature
              </h3>
              <button onClick={clearSignature} className="text-xs text-foreground/60 hover:text-primary transition-colors">
                Clear Pad
              </button>
            </div>
            
            <div className="bg-secondary/20 border-2 border-dashed border-border rounded-lg mb-4 overflow-hidden">
              <canvas
                ref={canvasRef}
                width={400}
                height={150}
                className="w-full h-[150px] cursor-crosshair bg-transparent touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
            
            <Button className="w-full shadow-md" onClick={handleSignDocument} disabled={!hasSignature}>
              Sign & Finalize Agreement
            </Button>
          </div>
        )}

        {/* State 4: Signed Success State */}
        {status === 'Signed' && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center flex flex-col items-center animate-slide-up">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-green-600 dark:text-green-400">Agreement Executed</h3>
            <p className="text-sm text-green-600/70 dark:text-green-400/70 mt-1">
              Both parties have signed. The contract has been securely saved to the vault.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}