import dynamic from 'next/dynamic';

export default dynamic(() => import('./PhaserInstance'), { ssr: false });
