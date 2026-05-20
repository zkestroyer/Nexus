import React from 'react';
import { FileText, Upload, Download, Trash2, Share2, HardDrive } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const documents = [
  { id: 1, name: 'Pitch Deck 2026.pdf', type: 'PDF', size: '2.4 MB', lastModified: '2026-05-15', shared: true },
  { id: 2, name: 'Financial Projections.xlsx', type: 'Spreadsheet', size: '1.8 MB', lastModified: '2026-05-10', shared: false },
  { id: 3, name: 'Business Plan.docx', type: 'Document', size: '3.2 MB', lastModified: '2026-05-05', shared: true },
  { id: 4, name: 'Market Research.pdf', type: 'PDF', size: '5.1 MB', lastModified: '2026-04-28', shared: false }
];

export const DocumentsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Document Vault</h1>
          <p className="text-sm text-foreground/70">Manage your startup's sensitive files and pitch materials</p>
        </div>
        
        <Button leftIcon={<Upload size={18} />} className="shadow-md shadow-primary/20">
          Upload Document
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Storage Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gradient-to-br from-secondary/40 to-background border border-border">
            <CardHeader className="bg-transparent border-b border-border/50 pb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <HardDrive size={18} className="text-primary" /> Storage
              </h2>
            </CardHeader>
            <CardBody className="space-y-5 pt-4">
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70 font-medium">Used</span>
                  <span className="font-bold text-foreground">12.5 GB</span>
                </div>
                
                {/* Glowing Premium Progress Bar */}
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden border border-border/50">
                  <div className="h-full bg-primary rounded-full relative" style={{ width: '65%' }}>
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-foreground/50">Available</span>
                  <span className="font-medium text-foreground/70">7.5 GB</span>
                </div>
              </div>
              
              <div className="pt-5 border-t border-border/50">
                <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">Quick Access</h3>
                <div className="space-y-1">
                  {['Recent Files', 'Shared with Me', 'Starred', 'Trash'].map((item, i) => (
                    <button key={i} className="w-full text-left px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Right Column: Document List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center bg-secondary/10">
              <h2 className="text-lg font-bold text-foreground">All Documents</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-background">Sort by</Button>
                <Button variant="outline" size="sm" className="bg-background">Filter</Button>
              </div>
            </CardHeader>
            
            {/* Removed padding so the list touches the edges perfectly */}
            <CardBody className="p-0">
              <div className="divide-y divide-border/50">
                {documents.map(doc => (
                  <div
                    key={doc.id}
                    className="flex items-center p-4 hover:bg-secondary/30 transition-all duration-200 group cursor-pointer"
                  >
                    {/* Animated Icon Wrapper */}
                    <div className="p-2.5 bg-primary/10 rounded-xl mr-4 group-hover:bg-primary/20 group-hover:scale-105 transition-all">
                      <FileText size={24} className="text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                          {doc.name}
                        </h3>
                        {doc.shared && (
                          <Badge variant="secondary" className="text-[10px] uppercase px-2 py-0.5 bg-secondary text-foreground/70 border border-border/50">
                            Shared
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 mt-1.5 text-xs font-medium text-foreground/50">
                        <span className="bg-secondary/50 px-2 py-0.5 rounded-md">{doc.type}</span>
                        <span>{doc.size}</span>
                        <span>Modified {doc.lastModified}</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons: Fade in slightly on hover */}
                    <div className="flex items-center gap-1.5 ml-4 opacity-70 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="p-2 hover:text-primary hover:bg-primary/10" aria-label="Download">
                        <Download size={18} />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 hover:text-primary hover:bg-primary/10" aria-label="Share">
                        <Share2 size={18} />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 text-foreground/50 hover:text-red-500 hover:bg-red-500/10" aria-label="Delete">
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};