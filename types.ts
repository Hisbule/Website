import React from 'react';

export interface NavItem {
  label: string;
  path: string;
  dropdown?: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  path: string; // usually a hash link like /about#mission
}

export interface ProductSection {
  id: string;
  title: string;
  description?: string;
}

export interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}