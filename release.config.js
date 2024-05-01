/* eslint-disable no-template-curly-in-string */
module.exports = {
  branches: ['deploy', '+([0-9])?(.{+([0-9]),x}).x', 'prerelease'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'chore', scope: 'pre-release', release: 'patch' },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# Change Log',
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: ['deploy', '3.x', '4.x']
          .includes(process.env.GITHUB_REF_NAME)
          ? './scripts/publish.sh ${nextRelease.version}'
          : './scripts/prerelease-publish.sh ${nextRelease.version}',
      },
    ],
    '@semantic-release/git',
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: '*.vsix',
            label: 'Extension File',
          },
        ],
      },
    ],
  ],
};
