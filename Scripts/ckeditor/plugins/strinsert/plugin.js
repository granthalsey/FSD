/**
 * @license Copyright © 2013 Stuart Sillitoe <stuart@vericode.co.uk>
 * This work is mine, and yours. You can modify it as you wish.
 *
 * Stuart Sillitoe
 * stuartsillitoe.co.uk
 *
 */

CKEDITOR.plugins.add('strinsert',
{
    requires: ['richcombo', 'widget'],
    init: function (editor) {
        //  array of strings to choose from that'll be inserted into the editor
        var strings = [];
        var fields = [];
        var useAdvancedMergeVariables = false;
        var requiredFields = [];
        if (editor.config !== null && editor.config !== undefined && editor.config.mergeVariables !== null && editor.config.mergeVariables !== undefined) {
            fields = editor.config.mergeVariables;

            if (editor.config.useAdvancedMergeVariables !== null &&
                editor.config.useAdvancedMergeVariables !== undefined) {
                useAdvancedMergeVariables = editor.config.useAdvancedMergeVariables;
            }
        }
        if (editor.config !== null && editor.config !== undefined && editor.config.requriedMergeVariables !== null && editor.config.requriedMergeVariables !== undefined) {
            requiredFields = editor.config.requriedMergeVariables.split(',');
        }
        for (var i = 0; i < fields.length; i++) {
            if (useAdvancedMergeVariables) {
                var name = requiredFields.indexOf(fields[i]) > -1 ? fields[i].Name + '*' : fields[i].Name;
                var tag = '';
                if (fields[i].IsCustomField) {
                    tag = '<span class="mergevariable"  data-display="$' + fields[i].MergeVariableGuid + '"><%' + fields[i].Name + '%></span>&nbsp';
                } else {
                    tag = '<span class="mergevariable"  data-display="$' + fields[i].Name + '"><%' + fields[i].Name + '%></span>&nbsp';
                }
                var label = fields[i].Name;

                strings.push([tag, name, label]);
            } else {
                if (requiredFields.indexOf(fields[i]) > -1) {
                    strings.push(['<%' + fields[i].Name + '%>', fields[i].Name + '*', fields[i].Name]);
                } else {
                    strings.push(['<%' + fields[i].Name + '%>', fields[i].Name, fields[i].Name]);
                }
            }
        }

        // add the menu to the editor
        editor.ui.addRichCombo('strinsert',
		{
		    label: 'Select Merge Variable',
		    title: 'Select Merge Variable',
		    voiceLabel: 'Select Merge Variable',
		    className: 'cke_format',
		    multiSelect: false,
		    panel:
			{
			    css: [editor.config.contentsCss, CKEDITOR.skin.getPath('editor')],
			    voiceLabel: editor.lang.panelVoiceLabel
			},

		    init: function () {
		        this.startGroup("Select Merge Variable");
		        for (var i in strings) {
		            this.add(strings[i][0], strings[i][1], strings[i][2]);
		        }
		    },

		    onClick: function (value) {
		        editor.focus();
		        editor.fire('saveSnapshot');
		        editor.insertHtml(value);
		        editor.fire('saveSnapshot');
		    }
		});

        if (useAdvancedMergeVariables) {
            editor.widgets.add('strinsert',
            {
                upcast: function(element) {
                    return element.hasClass('mergevariable');
                }
            });
        }
    }
});