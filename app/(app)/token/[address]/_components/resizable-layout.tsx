'use client';

import { CardTab } from '@/components/ui';
import { useIsMobile } from '@/hooks';
import { cloneElement, isValidElement, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

interface ResizableLayoutProps {
  chartComponent: React.ReactNode;
  tabsComponent: React.ReactNode;
  sidePanelComponent: React.ReactNode;
}

// Temporary UI component for collapsed panels
const TempCollapsedUI = ({ type }: { type: 'chart' | 'side' }) => (
  <div className="h-full w-full flex items-center justify-center bg-muted/50 rounded-md border-2 border-dashed border-muted-foreground/25">
    <div className="text-center text-muted-foreground">
      <div className="text-sm font-medium">
        {type === 'chart' ? 'Chart Collapsed' : 'Chat Collapsed'}
      </div>
      <div className="text-xs mt-1">
        Resize to expand
      </div>
    </div>
  </div>
);

const ResizableLayout = ({
  chartComponent,
  tabsComponent,
  sidePanelComponent,
}: ResizableLayoutProps) => {
  const isMobile = useIsMobile();
  const [chartPanelSize, setChartPanelSize] = useState(60);
  const [sidePanelSize, setSidePanelSize] = useState(40);

  // Helper function to clone component with size prop
  const cloneComponentWithSize = (component: React.ReactNode, size: number) => {
    if (isValidElement(component)) {
      return cloneElement(component as React.ReactElement<any>, { size });
    }
    return component;
  };


  if (isMobile) {
    return (
      <div className="md:flex-1 md:h-0 h-full overflow-y-auto md:overflow-hidden flex flex-col md:flex-row gap-2">
        <PanelGroup direction="vertical" className="flex-1">
          <Panel defaultSize={60} minSize={30} className="flex flex-col gap-2">
            <PanelGroup
              direction="horizontal"
              className="flex-1"
              onLayout={(sizes) => {
                setChartPanelSize(sizes[0] || 60);
                setSidePanelSize(sizes[1] || 40);
              }}
            >
              <Panel defaultSize={70} minSize={20} className="flex flex-col gap-2">
                <PanelGroup direction="vertical" className="h-full">
                  <CardTab className="h-full overflow-hidden max-h-full">
                    {chartPanelSize < 50 ? (
                      <TempCollapsedUI type="chart" />
                    ) : (
                      cloneComponentWithSize(chartComponent, chartPanelSize)
                    )}
                  </CardTab>
                </PanelGroup>
              </Panel>
              <PanelResizeHandle className="w-2 md:hover:bg-accent rounded-sm transition-colors" />
              <Panel defaultSize={30} minSize={20}>
                <CardTab className="h-full flex flex-col gap-2 overflow-hidden">
                  {sidePanelSize < 50 ? (
                    <TempCollapsedUI type="side" />
                  ) : (
                    cloneComponentWithSize(sidePanelComponent, sidePanelSize)
                  )}
                </CardTab>
              </Panel>
            </PanelGroup>
          </Panel>
          <PanelResizeHandle className="h-2 md:hover:bg-accent rounded-sm transition-colors" />
          <Panel defaultSize={40} minSize={20} style={{ overflow: 'auto' }}>
            <CardTab className="h-full w-[764px] flex flex-col gap-2">
              {tabsComponent}
            </CardTab>
          </Panel>
        </PanelGroup>
      </div>
    )
  }
  return (
    <div className="md:flex-1 md:h-0 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row gap-2">
      <PanelGroup direction="horizontal" className="flex-1">
        <Panel defaultSize={60} minSize={30} className="flex flex-col gap-2">
          <PanelGroup direction="vertical" className="h-full">
            <Panel defaultSize={60} minSize={20}>
              <CardTab className="h-full overflow-hidden max-h-full">
                {chartComponent}
              </CardTab>
            </Panel>
            <PanelResizeHandle className="h-2 hover:bg-accent rounded-sm transition-colors" />
            <Panel defaultSize={40} minSize={30}>
              <CardTab className="h-full overflow-y-auto">
                {tabsComponent}
              </CardTab>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="w-2 md:hover:bg-accent rounded-sm transition-colors" />
        <Panel defaultSize={40} minSize={40}>
          <CardTab className="h-full w-full flex flex-col gap-2 overflow-hidden">
            {sidePanelComponent}
          </CardTab>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default ResizableLayout;
