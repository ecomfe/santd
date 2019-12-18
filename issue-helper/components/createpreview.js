/**
 * @file issue helper create preview file
 **/


function createBugPreview({
    version = '',
    environment = '',
    reproduction = '',
    steps = '',
    expected = '',
    actual = '',
    extra = '',
    repo = ''
}) {
    return `
  ### Version
  ${version}
  ### Environment
  ${environment}
  ### Reproduction link
  ${createReproductionLink(reproduction)}
  ### Steps to reproduce
  ${steps}
  ### What is expected?
  ${expected}
  ### What is actually happening?
  ${actual}
  ${extra ? `---\n${extra}` : ''}
  `.split('\n').map(t => t.trim()).join('\n');
}

function createFeaturePreview({motivation = '', proposal = ''}) {
    return `
  ### What problem does this feature solve?
  ${motivation}
  ### What does the proposed API look like?
  ${proposal}
  `.split('\n').map(t => t.trim()).join('\n');
}

function createReproductionLink(link) {
    if (!link) {
        return;
    }

    if (link.indexOf('codesandbox.io') >= 0) {
        return `[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](${link})`;
    }

    return `[${link}](${link})`;
}

export default function createPreview(issueType, values) {
    if (issueType === 'bug') {
        return createBugPreview(values);
    }
    return createFeaturePreview(values);
}
