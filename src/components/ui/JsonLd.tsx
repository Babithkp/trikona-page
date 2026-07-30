/**
 * Renders a Schema.org JSON-LD block.
 *
 * Emitted as a plain <script> in the server-rendered markup so crawlers that
 * do not execute JavaScript still see the structured data.
 */
export default function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Schema objects are constructed in our own code, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
