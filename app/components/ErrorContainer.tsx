export type ErrorContainerProps = {
  error: unknown;
};

export type ErrorMessage = {
  heading: string | number;
  content: any;
};

export function ErrorContainer({ heading, content }: ErrorMessage) {
  return (
    <div className="m-12 border border-redDark-red6 bg-redDark-red2 p-4 text-redDark-red9">
      {heading ? <h1 className="text-lg font-semibold">{heading}</h1> : null}
      {content ? <pre>{content}</pre> : null}
    </div>
  );
}
