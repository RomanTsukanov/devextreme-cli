module.exports = {
    sourcePath: 'packages/devextreme-cli/testing/sandbox/react/my-app/',
    targetPath: 'packages/devextreme-cli/src/templates/react/application/',
    sourceGlob: '**/*.{js,scss,json}',
    ignoreList: [
        'src/themes/generated/*.*',
        'src/pages/new-page/new-page.scss',
        'node_modules/**/*.*',
        'public/*.*',
        'src/App.test.js',
        'src/setupTests.js',
        'src/serviceWorker.js',
        'src/index.js',
        'package.json',
        'package-lock.json'
    ],
    replaceRules: [
        {
            glob: 'src/app-routes.js',
            definitions: [
                {
                    before: /(\nimport {([^}]*)} from '.\/pages';)/,
                    after: '<%=^empty%>$1<%=/empty%>'
                },
                {
                    before: /(const routes = \[)([^\]]*)(\])/,
                    after: '$1<%=^empty%>$2<%=/empty%>$3'
                }
            ],
        },
        {
            glob: 'src/app-info.js',
            definitions: [
                {
                    before: 'My App',
                    after: '<%=project%>'
                }
            ]
        },
        {
            glob: 'src/app-navigation.js',
            definitions: [
                {
                    before: '= [',
                    after: '= [<%=^empty%>'
                },
                {
                    before: '];',
                    after: '<%=/empty%>];'
                }
            ]
        },
        {
            glob:'src/pages/new-page/new-page.js',
            definitions: [
                {
                    before:'new-page',
                    after:'<%=pageName%>'
                },
                {
                    before:/(<h2 className={'content-block'}>)[^<]*(<\/h2>)/,
                    after:'$1<%=title%>$2'
                }
            ]
        },
        {
            glob: 'src/Content.js',
            definitions: [
                {
                    before: /SideNav(Outer|Inner)Toolbar/,
                    after: '<%=layout%>'
                },
                {
                    before: '))}',
                    after: '))}<%=^empty%>'
                },
                {
                    before: '<Redirect to={\'/home\'} />',
                    after: '<Redirect to={\'/home\'} /><%=/empty%>'
                }
            ]
        },
        {
            glob: 'src/themes/metadata.additional.json',
            definitions: [
                {
                    before: /"baseTheme": "[^"]*?"/,
                    after: '"baseTheme": "material.orange.dark"'
                }
            ]
        },
        {
            glob: 'src/themes/metadata.base.json',
            definitions: [
                {
                    before: /"baseTheme": "[^"]*?"/,
                    after: '"baseTheme": "material.orange.light"'
                }
            ]
        },
        {
            glob: 'src/themes/metadata.*.json',
            definitions: [
                {
                    before: /"items":\s+\[[^\]]*?\]/,
                    after: '"items": []'
                }
            ]
        }
    ],
    removeRules: [
        {
            glob: 'src/App.js',
            definitions: [
                'import \'devextreme/dist/css/dx.common.css\';\n',
                'import \'./themes/generated/theme.base.css\';\n',
                'import \'./themes/generated/theme.additional.css\';\n',
            ]
        },
        {
            glob: 'src/app-routes.js',
            definitions: [
                    ', NewPagePage'                   
            ]
        },
        {
            glob: 'src/app-navigation.js|src/app-routes.js',
            definitions: [
                /,\s+{[^}]*'\/new-page'[^}]*}/            
            ]
        },
        {
            glob:'src/pages/index.js',
            definitions: [
                'export { default as NewPagePage } from \'./new-page/new-page\';\n'
            ]
        },
    ],
    moveRules: [
        {
            glob: 'src/pages/!(new-page/new-page.js)',
            definition: {
                sourcePath: 'src/pages',
                targetPath: 'packages/devextreme-cli/src/templates/react/sample-pages'
            }
        },
        {
            glob: 'src/pages/new-page/new-page.js',
            definition: {
                sourcePath: 'src/pages/new-page/new-page.js',
                targetPath: 'packages/devextreme-cli/src/templates/react/page/page.js'
            }
        }
    ]
};
