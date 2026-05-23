'use client';
import { CrudListPage } from '@/components/crud/CrudListPage';
import { lessonBlocksConfig } from '@/components/crud/configs';
export default function Page() { return <CrudListPage cfg={lessonBlocksConfig} />; }
