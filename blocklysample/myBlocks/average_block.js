Blockly.Blocks['average'] = {
    init: function() {
        this.appendValueInput("v1")
            .setCheck("Number");
        this.appendValueInput("v2")
            .setCheck("Number")
            .appendField("と");
        this.appendDummyInput()
            .appendField("の平均値");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(120);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['console_log'] = {
    init: function() {
        this.appendValueInput("msg")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("を出力する");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};