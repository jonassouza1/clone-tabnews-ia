import { Suspense } from "react";
import ConfettiAnimation from "./confetti-animation";

async function getPublishedContentCount() {
  try {
    const response = await fetch(
      "https://www.tabnews.com.br/api/v1/contents?strategy=new&per_page=1",
      { next: { revalidate: 300 } },
    );

    if (!response.ok) {
      return null;
    }

    const totalRows = response.headers.get("x-pagination-total-rows");
    if (totalRows === null) {
      return null;
    }

    const count = Number(totalRows);
    return Number.isSafeInteger(count) ? count : null;
  } catch {
    return null;
  }
}

function ContentCount({ count, loading = false }) {
  return (
    <div className="content-count" aria-live="polite">
      <span className="count-label">Conteúdos publicados no TabNews</span>
      <strong>
        {loading
          ? "Carregando..."
          : count === null
            ? "Indisponível"
            : count.toLocaleString("pt-BR")}
      </strong>
    </div>
  );
}

async function PublishedContentCount() {
  const publishedContentCount = await getPublishedContentCount();
  return <ContentCount count={publishedContentCount} />;
}

export default function Home() {
  return (
    <main className="construction-page">
      <ConfettiAnimation />
      <div className="construction-content">
        <p className="eyebrow">
          TabNews <span>•</span> Em Construção
        </p>
        <h1>Em Construção</h1>
        <p className="intro">
          estamos neste exato momento reconstruindo o tabnews, um lugar na
          internet para quem trabalha com tecnologia e precisa consumir
          conteudos com valor concreto
        </p>
        <Suspense fallback={<ContentCount count={null} loading />}>
          <PublishedContentCount />
        </Suspense>
        <a className="official-link" href="https://www.tabnews.com.br">
          Acesse o site oficial <span aria-hidden="true">↗</span>
        </a>
      </div>
    </main>
  );
}
