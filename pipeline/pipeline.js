module.exports = {
    name: 'rise-cli-foundation-pipeline',
    stages: [
        {
            name: 'Source',
            actions: [
                {
                    type: 'SOURCE',
                    name: 'GithubRepo',
                    repo: 'rise-cli-foundation',
                    owner: 'rise-cli',
                    outputArtifact: 'sourceZip'
                }
            ]
        },
        {
            name: 'Prod',
            actions: [
                /**
                 * The reason this is comment out right now is because
                 * code pipeline has an issue with running tests that
                 * write to the filesystem
                 */

                // {
                //     type: 'BUILD',
                //     name: 'Test',
                //     script: '/test.yml',
                //     inputArtifact: 'sourceZip',
                //     outputArtifact: 'testZip'
                // },
                {
                    type: 'BUILD',
                    name: 'PublishToNpm',
                    script: '/publish.yml',
                    env: {
                        NPM_TOKEN: '@secret.NPM_KEY'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'publishedZip'
                }
            ]
        }
    ]
}
