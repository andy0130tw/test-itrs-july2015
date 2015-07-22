$('#myButton').click(function() {
    console.log('button is clicked');
    var inputText = $('#input').val();
    console.log('Input text = ' + inputText);

    var outputField = $('#output');
    var output = '';
    var num = inputText - 0;
    for (var i = 1; i <= num; i++) {
    	output += '*'.repeat(i) + '<br/>';
    }

    outputField.html(output);
});

$('body').keypress(function(evt) {
    var which = evt.which;
    console.log('key ' + which + ' is pressed');
});
