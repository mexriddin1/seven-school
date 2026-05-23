'use client';
import { CrudFormPage } from '@/components/crud/CrudFormPage';
import { ecoStagesConfig } from '@/components/crud/configs';
export default function Page() { return <CrudFormPage cfg={ecoStagesConfig} />; }
