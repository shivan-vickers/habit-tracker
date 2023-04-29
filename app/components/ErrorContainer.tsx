export type ErrorContainerProps = {
  error: unknown;
};

export type ErrorMessage = {
  heading: string | number;
  content: any;
};

export function ErrorContainer({ heading, content }: ErrorMessage) {
  return (
    <div className="m-12 border border-red-red6 bg-red-red2 p-4 text-red-red9 dark:border-redDark-red6 dark:bg-redDark-red2 dark:text-redDark-red9">
      {heading ? <h1 className="text-lg font-semibold">{heading}</h1> : null}
      {content ? <pre>{content}</pre> : null}
    </div>
  );
}
