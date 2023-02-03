import Image from "next/image";

async function getSongs() {
  const res = await fetch("songs.json");

  if (!res.ok) {
    throw new Error("Failed to get songs");
  }

  return res.json();
}

export default async function Index() {
  const songs = await getSongs();

  return (
    <>
      <header>
        <h1>laulum.me</h1>
        <Image src="/logo.svg" alt="Logo of TKO-äly ry" />
      </header>
      <main>{songs.length}</main>
    </>
  );
}
