jQuery(function($) {
    var fields = [{
            type: 'autocomplete',
            label: 'Custom Autocomplete',
            required: true,
            values: [
                { label: 'SQL' },
                { label: 'C#' },
                { label: 'JavaScript' },
                { label: 'Java' },
                { label: 'Python' },
                { label: 'C++' },
                { label: 'PHP' },
                { label: 'Swift' },
                { label: 'Ruby' }
            ]
        },
        {
            label: 'Star Rating',
            attrs: {
                type: 'starRating'
            },
            icon: '🌟'
        }
    ];

    var actionButtons = [{
        id: 'smile',
        className: 'btn btn-success',
        label: '😁',
        type: 'button',
        events: {
            click: function() {
                alert('😁😁😁 !SMILE! 😁😁😁');
            }
        }
    }];

    var templates = {
        starRating: function(fieldData) {
            return {
                field: '<span id="' + fieldData.name + '">',
                onRender: function() {
                    $(document.getElementById(fieldData.name)).rateYo({ rating: 3.6 });
                }
            };
        }
    };

    var inputSets = [{
        label: 'User Details',
        name: 'user-details', // optional
        showHeader: true, // optional
        fields: [{
            type: 'text',
            label: 'First Name',
            className: 'form-control'
        }, {
            type: 'select',
            label: 'Profession',
            className: 'form-control',
            values: [{
                label: 'Street Sweeper',
                value: 'option-2',
                selected: false
            }, {
                label: 'Brain Surgeon',
                value: 'option-3',
                selected: false
            }]
        }, {
            type: 'textarea',
            label: 'Short Bio:',
            className: 'form-control'
        }]
    }, {
        label: 'User Agreement',
        fields: [{
            type: 'header',
            subtype: 'h3',
            label: 'Terms & Conditions',
            className: 'header'
        }, {
            type: 'paragraph',
            label: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.',
        }, {
            type: 'paragraph',
            label: 'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.',
        }, {
            type: 'checkbox',
            label: 'Do you agree to the terms and conditions?',
        }]
    }];

    var typeUserDisabledAttrs = {
        autocomplete: ['access']
    };

    var typeUserAttrs = {
        text: {
            className: {
                label: 'Class',
                options: {
                    'red form-control': 'Red',
                    'green form-control': 'Green',
                    'blue form-control': 'Blue'
                },
                style: 'border: 1px solid red'
            }
        }
    };

    // test disabledAttrs
    var disabledAttrs = ['placeholder'];

    var fbOptions = {
        subtypes: {
            text: ['datetime-local']
        },
        onSave: function(e, formData) {
            toggleEdit();
            $('.render-wrap').formRender({
                formData: formData,
                templates: templates
            });
            window.sessionStorage.setItem('formData', JSON.stringify(formData));
        },
        stickyControls: {
            enable: true
        },
        sortableControls: true,
        fields: fields,
        templates: templates,
        inputSets: inputSets,
        typeUserDisabledAttrs: typeUserDisabledAttrs,
        typeUserAttrs: typeUserAttrs,
        disableInjectedStyle: false,
        actionButtons: actionButtons,
        disableFields: ['autocomplete']
            // controlPosition: 'left'
            // disabledAttrs
    };


    var fbOptions1 = {
        actionButtons: actionButtons,
        fieldRemoveWarn: true,
        disableInjectedStyle: false,
        controlOrder: ['header', 'text', 'textarea', 'checkbox-group', 'date', 'signature', 'paragraph', 'number', 'radio-group', 'select', 'file'],
        disableFields: ['autocomplete', 'button', 'hidden', 'file']
    };

    var formData = window.sessionStorage.getItem('formData');
    var editing = true;

    if (formData) {
        fbOptions.formData = JSON.parse(formData);
    }

    /**
     * Toggles the edit mode for the demo
     * @return {Boolean} editMode
     */
    function toggleEdit() {
        document.body.classList.toggle('form-rendered', editing);
        return editing = !editing;
    }

    var setFormData = '[{"type":"header","subtype":"large","label":"PC Games Location Form","name":"header_pc_games_location_form"},{"type":"checkbox-group","required":true,"label":"Video Card Brands Previously Owned","values":[{"label":"Nvidia","value":"nvidia","selected":false},{"label":"AMD","value":"amd","selected":true},{"label":"Matrox","value":"matrox","selected":true},{"label":"Voodoo","value":"voodoo","selected":false}],"name":"checkbox_group_video_card_brands_previously_owned","value":["amd","matrox"]},{"type":"select","required":true,"label":"Favourite CPU Brand","placeholder":"Select One","className":"form-control","other":true,"otherLabel":"Describe CPU Brand","otherPlaceholder":"Enter brand name","values":[{"label":"Intel","value":"intel","selected":true},{"label":"AMD","value":"amd"},{"label":"Jaguar","value":"jaguar"},{"label":"Other","value":"other"}],"name":"select_favourite_cpu_brand","otherName":"select_favourite_cpu_brand_other","value":"amd","otherValue":""},{"type":"radio-group","required":true,"label":"Preferred Gaming Experience","values":[{"label":"High Quality Visuals","value":"high_quality_visuals","selected":true},{"label":"High Framerate","value":"high_framerate"},{"label":"Mix of the Two","value":"mix_of_the_two"}],"name":"radio_group_preferred_gaming_experience","value":"high_quality_visuals"},{"type":"signature","subtype":"canvas","name":"sign"}]';
    var setFormData1 = '[{"type":"header","subtype":"large","label":"PC Games Location Form","name":"header_pc_games_location_form"},{"type":"checkbox-group","required":true,"label":"Video Card Brands Previously Owned","values":[{"label":"Nvidia","value":"nvidia","selected":false},{"label":"AMD","value":"amd","selected":true},{"label":"Matrox","value":"matrox","selected":true},{"label":"Voodoo","value":"voodoo","selected":false}],"name":"checkbox_group_video_card_brands_previously_owned","value":["amd","matrox"]},{"type":"select","required":true,"label":"Favourite CPU Brand","placeholder":"Select One","className":"form-control","other":true,"otherLabel":"Describe CPU Brand","otherPlaceholder":"Enter brand name","values":[{"label":"Intel","value":"intel","selected":true},{"label":"AMD","value":"amd"},{"label":"Jaguar","value":"jaguar"},{"label":"Other","value":"other"}],"name":"select_favourite_cpu_brand","otherName":"select_favourite_cpu_brand_other","value":"amd","otherValue":""},{"type":"radio-group","required":true,"label":"Preferred Gaming Experience","values":[{"label":"High Quality Visuals","value":"high_quality_visuals","selected":true},{"label":"High Framerate","value":"high_framerate"},{"label":"Mix of the Two","value":"mix_of_the_two"}],"name":"radio_group_preferred_gaming_experience","value":"high_quality_visuals"},{"type":"signature","subtype":"canvas","name":"sign"}]';
    var setFormData2 = '';

    var formBuilder = $('.build-wrap').formBuilder(fbOptions1);
    var fbPromise = formBuilder.promise;

    fbPromise.then(function(fb) {
        var apiBtns = {
            showData: fb.actions.showData,
            clearFields: fb.actions.clearFields,
            getData: function() {
                console.log(fb.actions.getData());

                const formData = fb.actions.getData();
                toggleEdit();
                $('.render-wrap').formRender({
                    formData: setFormData1,
                    templates: templates
                });
                window.sessionStorage.setItem('formData', JSON.stringify(formData));

            },
            setData: function() {
                fb.actions.setData(setFormData);
            },
            addField: function() {
                var field = {
                    type: 'text',
                    class: 'form-control',
                    label: 'Text Field added at: ' + new Date().getTime()
                };
                fb.actions.addField(field);
            },
            removeField: function() {
                fb.actions.removeField();
            },
            testSubmit: function() {
                var formData = new FormData(document.forms[0]);
                console.log('Can submit: ', document.forms[0].checkValidity());
                // Display the key/value pairs
                console.log('FormData: ', );
                for (var pair of formData.entries()) {
                    console.log(pair[0] + ': ' + pair[1]);
                }
            },
            resetDemo: function() {
                window.sessionStorage.removeItem('formData');
                location.reload();
            }
        };

        Object.keys(apiBtns).forEach(function(action) {
            document.getElementById(action)
                .addEventListener('click', function(e) {
                    apiBtns[action]();
                });
        });

        document.getElementById('setLanguage')
            .addEventListener('change', function(e) {
                fb.actions.setLang(e.target.value);
            });

        document.getElementById('getXML').addEventListener('click', function() {
            alert(formBuilder.actions.getData('xml'));
        });
        document.getElementById('getJSON').addEventListener('click', function() {
            alert(formBuilder.actions.getData('json', true));
        });
        document.getElementById('getJS').addEventListener('click', function() {
            alert('check console');
            console.log(formBuilder.actions.getData());
        });
    });

    document.getElementById('edit-form').onclick = function() {
        toggleEdit();
    };
});