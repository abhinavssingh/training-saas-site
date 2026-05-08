'use client';

import { type ReactElement, useCallback } from 'react';

/**
 * Error type detection based on the `name` property set by each SDK error class.
 * See: @optimizely/cms-sdk/src/graph/error.ts
 *
 * Hierarchy:
 *   OptimizelyGraphError
 *     ├─ GraphMissingContentTypeError  (contentType)
 *     └─ GraphResponseError            (request: { query, variables })
 *         └─ GraphHttpResponseError    (status)
 *             └─ GraphContentResponseError (errors: { message }[])
 */

type GraphRequest = {
  query: string;
  variables: Record<string, unknown>;
};

type GraphQLError = {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  extensions?: Record<string, unknown>;
};

type Props = {
  error: unknown;
  params: Record<string, string | string[] | undefined>;
};

// --- Error type guards using the SDK's `name` property ---

function isOptimizelyGraphError(err: unknown): err is Error & { name: string } {
  return err instanceof Error && err.name.startsWith('Graph');
}

function isMissingContentTypeError(err: unknown): err is Error & { contentType: string } {
  return err instanceof Error && err.name === 'GraphMissingContentTypeError';
}

function isGraphResponseError(err: unknown): err is Error & { request: GraphRequest } {
  return (
    err instanceof Error &&
    (err.name === 'GraphResponseError' ||
      err.name === 'GraphHttpResponseError' ||
      err.name === 'GraphContentResponseError') &&
    'request' in err
  );
}

function isGraphHttpResponseError(
  err: unknown,
): err is Error & { status: number; request: GraphRequest } {
  return (
    err instanceof Error &&
    (err.name === 'GraphHttpResponseError' || err.name === 'GraphContentResponseError') &&
    'status' in err
  );
}

function isGraphContentResponseError(err: unknown): err is Error & {
  errors: GraphQLError[];
  status: number;
  request: GraphRequest;
} {
  return err instanceof Error && err.name === 'GraphContentResponseError' && 'errors' in err;
}

// --- Helpers ---

function getErrorLocations(errors: GraphQLError[]): Set<number> {
  const locations = new Set<number>();
  errors.forEach((err) => {
    err.locations?.forEach((loc) => locations.add(loc.line));
  });
  return locations;
}

function formatQueryWithErrors(query: string, errorLocations: Set<number>): ReactElement[] {
  return query.split('\n').map((line, index) => {
    const lineNumber = index + 1;
    const hasError = errorLocations.has(lineNumber);
    return (
      <div key={index} className={`whitespace-pre ${hasError ? 'bg-red-100' : ''}`}>
        <span
          className={`inline-block w-12 pr-3 text-right select-none ${hasError ? 'font-bold text-red-700' : 'text-gray-800'}`}
        >
          {lineNumber}
        </span>
        <span className={hasError ? 'text-red-700' : 'text-gray-800'}>{line}</span>
      </div>
    );
  });
}

function getErrorTypeBadge(error: unknown): {
  label: string;
  color: string;
} | null {
  if (isMissingContentTypeError(error))
    return { label: 'Missing Content Type', color: 'bg-orange-100 text-orange-800' };
  if (isGraphContentResponseError(error))
    return { label: 'GraphQL Error', color: 'bg-red-100 text-red-800' };
  if (isGraphHttpResponseError(error))
    return { label: `HTTP ${error.status}`, color: 'bg-red-100 text-red-800' };
  if (isGraphResponseError(error))
    return { label: 'Graph Response Error', color: 'bg-red-100 text-red-800' };
  if (isOptimizelyGraphError(error))
    return { label: 'Graph Error', color: 'bg-yellow-100 text-yellow-800' };
  return null;
}

function getTroubleshootingTips(error: unknown): string[] {
  if (isMissingContentTypeError(error)) {
    return [
      `The content type "${error.contentType}" is not registered in the SDK.`,
      'Ensure you have a content type definition file in src/content-types/ for this type.',
      'Check that initContentTypeRegistry() in src/optimizely.ts includes this content type.',
      'Run `npm run cms:push-config` to sync content type definitions to the CMS.',
    ];
  }

  if (isGraphContentResponseError(error)) {
    const hasUnknownType = error.errors.some((e) => e.message.startsWith('Unknown type'));
    const hasCannotQuery = error.errors.some((e) => e.message.startsWith('Cannot query field'));
    const hasSyntaxError = error.errors.some((e) => e.message.startsWith('Syntax Error'));
    const hasNoContent = error.errors.some((e) => e.message.includes('No content found'));

    const tips: string[] = [];
    if (hasUnknownType || hasCannotQuery) {
      tips.push(
        'The GraphQL schema does not match your content type definitions.',
        'Run `npm run cms:push-config` to sync definitions to the CMS.',
        'After syncing, wait a few seconds for Optimizely Graph to re-index the schema.',
        'Copy the query below into GraphiQL to test it directly against the Graph endpoint.',
      );
    }
    if (hasSyntaxError) {
      tips.push(
        'The generated GraphQL query has a syntax error. This is likely an SDK bug.',
        'Copy the query below into GraphiQL to see exact error details.',
        'If the error persists, contact Optimizely support.',
      );
    }
    if (hasNoContent) {
      tips.push(
        'The requested content was not found in the Graph index.',
        'Content may not be published yet, or the index may be stale.',
        'The preview page retries automatically, but you can also try refreshing.',
      );
    }
    if (tips.length === 0) {
      tips.push(
        'Copy the query and variables below into GraphiQL to debug the request.',
        'Verify that the content exists and is published in the CMS.',
      );
    }
    return tips;
  }

  if (isGraphHttpResponseError(error)) {
    const tips: string[] = [];
    if (error.status === 401) {
      tips.push(
        'Authentication failed. Check that OPTIMIZELY_GRAPH_SINGLE_KEY is correct.',
        'The key may have been rotated or expired.',
      );
    } else if (error.status === 404) {
      tips.push(
        'The Graph endpoint returned 404.',
        'Verify OPTIMIZELY_GRAPH_GATEWAY and OPTIMIZELY_CMS_URL environment variables.',
      );
    } else if (error.status >= 500) {
      tips.push(
        'The Optimizely Graph service returned a server error.',
        'This is usually temporary — try again in a few moments.',
        'If persistent, check the Optimizely status page.',
      );
    }
    return tips;
  }

  return [
    'Verify that content types are synced with `npm run cms:push-config`.',
    'Check that the content exists in the CMS and is published.',
    'Ensure environment variables are correctly configured.',
    'Verify the preview token is valid.',
  ];
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for environments without clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="cursor-pointer rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-300"
    >
      {label}
    </button>
  );
}

export default function PreviewError({ error, params }: Props) {
  const badge = getErrorTypeBadge(error);
  const tips = getTroubleshootingTips(error);

  const hasGraphQLErrors = isGraphContentResponseError(error);
  const graphQLErrors = hasGraphQLErrors ? error.errors : [];
  const errorLocations = hasGraphQLErrors ? getErrorLocations(graphQLErrors) : new Set<number>();

  const request = isGraphResponseError(error) ? error.request : undefined;
  const httpStatus = isGraphHttpResponseError(error) ? error.status : undefined;

  return (
    <div className="min-h-screen bg-red-50 p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <h1 className="text-2xl font-bold text-red-600">Preview Error</h1>
          {badge && (
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${badge.color}`}>
              {badge.label}
            </span>
          )}
          {httpStatus && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
              HTTP {httpStatus}
            </span>
          )}
        </div>

        {/* Error Message */}
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">Error Message</h2>
          <p className="rounded bg-gray-100 p-3 font-mono text-sm text-gray-700">
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
        </div>

        {/* Missing Content Type */}
        {isMissingContentTypeError(error) && (
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Missing Content Type</h2>
            <p className="rounded border border-orange-200 bg-orange-50 p-3 font-mono text-sm text-orange-900">
              {error.contentType}
            </p>
          </div>
        )}

        {/* GraphQL Errors */}
        {hasGraphQLErrors && graphQLErrors.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">GraphQL Errors ({graphQLErrors.length})</h2>
            <div className="space-y-3">
              {graphQLErrors.map((err, index) => (
                <div key={index} className="rounded bg-gray-100 p-3">
                  <p className="font-mono text-sm text-red-700">{err.message}</p>
                  {err.locations && err.locations.length > 0 && (
                    <div className="mt-2 text-xs text-gray-800">
                      <span className="font-semibold">
                        Location{err.locations.length > 1 ? 's' : ''}:
                      </span>{' '}
                      {err.locations.map((loc, i) => (
                        <span key={i} className="font-mono">
                          Line {loc.line}, Column {loc.column}
                          {i < err.locations!.length - 1 ? '; ' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                  {err.extensions && Object.keys(err.extensions).length > 0 && (
                    <pre className="mt-2 overflow-auto text-xs text-gray-800">
                      {JSON.stringify(err.extensions, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Graph Query — open by default for easy copy/paste to GraphiQL */}
        {request?.query && (
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold">GraphQL Query</h2>
              <div className="flex gap-2">
                <CopyButton text={request.query} label="Copy Query" />
                {request.variables && (
                  <CopyButton
                    text={JSON.stringify(request.variables, null, 2)}
                    label="Copy Variables"
                  />
                )}
                <CopyButton
                  text={JSON.stringify(
                    { query: request.query, variables: request.variables },
                    null,
                    2,
                  )}
                  label="Copy Full Request"
                />
              </div>
            </div>
            <p className="mb-2 text-xs text-gray-500">
              Paste the query and variables into GraphiQL or another GraphQL client to debug.
            </p>
            <div className="rounded border border-gray-200 bg-gray-100">
              <div className="max-h-96 overflow-auto p-3 font-mono text-xs">
                {formatQueryWithErrors(request.query, errorLocations)}
              </div>
            </div>
          </div>
        )}

        {/* Variables */}
        {request?.variables != null && (
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Query Variables</h2>
              <CopyButton text={JSON.stringify(request.variables, null, 2)} label="Copy" />
            </div>
            <pre className="overflow-auto rounded border border-gray-200 bg-gray-100 p-3 font-mono text-sm">
              {JSON.stringify(request.variables, null, 2)}
            </pre>
          </div>
        )}

        {/* Troubleshooting */}
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">Troubleshooting</h2>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Preview Parameters */}
        <details className="mb-6">
          <summary className="cursor-pointer font-semibold text-gray-600 hover:text-gray-800">
            Preview Parameters
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-gray-100 p-3 text-sm">
            {JSON.stringify(params, null, 2)}
          </pre>
        </details>

        {/* Full Error Details */}
        <details>
          <summary className="cursor-pointer font-semibold text-gray-600 hover:text-gray-800">
            Full Error Details
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-gray-100 p-3 text-xs">
            {JSON.stringify(error, Object.getOwnPropertyNames(error as object), 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
