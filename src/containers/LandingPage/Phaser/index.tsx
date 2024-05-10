import dynamic from "next/dynamic";

const PhaserWithoutSSR = dynamic(() => import("./PhaserInstance"), { ssr: false, loading: () => <div>HAHAHHA</div> });

export default function Phaser() {
  return <PhaserWithoutSSR />;
}
