(() => {
    const Dictionary = Ractive.extend({
            template: `
            <div class="dictionary">
            <h2>Dictionary:</h2>
            {{#each dictionary: item}}
                <div class="dictionary--item">
                {{#each dictionary[item]}}
                    <div>{{dictionary[item][@key]}}</div>
                {{/each}}
                </div>
            {{/each}}
            </div>
		`,
        data: function () {
            return ({
                dictionary: Translator.dictionary,
            })
        }
    })

    const App = new Ractive({
        target: '#translator--target',
        template: `
            <h1>
                Translator from {{translateFrom}} to {{translateTo}}
            </h1>
            <div class="buttons--wrapper">
                <select value="{{translateFrom}}">
                    {{#each supportedLanguages}}
                        <option value="{{@key}}">{{@key}}</option>
                    {{/each}}
                </select>
                <button on-click="@this.get('changeMode')()">Change</button>
                <select value="{{translateTo}}">
                    {{#each supportedLanguages}}
                        <option value="{{@key}}">{{@key}}</option>
                    {{/each}}
                </select>
            </div>
            <div>
                <textarea value="{{textAreas.left}}"/>
                <textarea value="{{textAreas.right}}"/>
            </div>
            <button on-click="@this.get('translate')()">Translate</button>
            <dictionary/>
        `,
        data: function () {
            return ({
                translateFrom: Translator.languages.en,
                translateTo: Translator.languages.pl,
                supportedLanguages: Translator.languages,
                textAreas: {
                    left: '',
                    right: ''
                },
                changeMode: function () {
                    const translateFrom = this.get('translateFrom');
                    const translateTo = this.get('translateTo');

                    this.set('translateFrom', translateTo);
                    this.set('translateTo', translateFrom);

                    const textAreas = {...this.get('textAreas')};
                    this.set('textAreas.left', textAreas.right);
                    this.set('textAreas.right', textAreas.left);
                },
                translate: function () {
                    const translateFrom = this.get('translateFrom');
                    const translateTo = this.get('translateTo');
                    const textAreas = this.get('textAreas');
                    const translatedSentence = Translator.translateSentence(textAreas.left, translateFrom, translateTo);
                    this.set('textAreas.right', translatedSentence);
                }
            })
        },
        components: {
            dictionary: Dictionary
        }
    });
})()