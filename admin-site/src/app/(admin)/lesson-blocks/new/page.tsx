'use client';
import { CrudFormPage } from '@/components/crud/CrudFormPage';
import { lessonBlocksConfig } from '@/components/crud/configs';
export default function Page() { return <CrudFormPage cfg={lessonBlocksConfig} />; }
