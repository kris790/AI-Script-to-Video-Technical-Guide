
import React from 'react';
import { Section } from './types';
import { DocumentTextIcon } from './components/icons/DocumentTextIcon';
import { FlagIcon } from './components/icons/FlagIcon';
import { SitemapIcon } from './components/icons/SitemapIcon';
import { WandIcon } from './components/icons/WandIcon';
import { DatabaseIcon } from './components/icons/DatabaseIcon';
import { DollarIcon } from './components/icons/DollarIcon';
import { ShieldIcon } from './components/icons/ShieldIcon';
import { CodeIcon } from './components/icons/CodeIcon';

export const SECTIONS: { id: Section; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: Section.Prd, label: 'PRD', icon: DocumentTextIcon },
  { id: Section.Roadmap, label: 'Roadmap', icon: FlagIcon },
  { id: Section.Architecture, label: 'Architecture', icon: SitemapIcon },
  { id: Section.ApiStrategy, label: 'API Strategy', icon: WandIcon },
  { id: Section.DatabaseSchema, label: 'Database Schema', icon: DatabaseIcon },
  { id: Section.CostOptimization, label: 'Cost Optimization', icon: DollarIcon },
  { id: Section.RiskMitigation, label: 'Risk Mitigation', icon: ShieldIcon },
  { id: Section.CodeSamples, label: 'Code Samples', icon: CodeIcon },
];