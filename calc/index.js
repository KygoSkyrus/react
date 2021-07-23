$(document).ready(function () {

    var arr = [];//for storing all button values
    var symbols = new RegExp('^[^0-9-]+.*');
    var moreThanOneOperators = new RegExp('[^0-9]{2}$');


    //all buttons
    $('button').on('click', function () {

        arr.push($(this).attr('value'));//this will push the value of the clicked button in arr
        arr = arr.filter(function (n) { return n != ""; });

        //prevent from non digits at the start
        if (symbols.test(arr)) {
            arr.splice(0, 1);
            if (arr.length == 0) {
                $('#display').text('0');
            }
        }

        //prevent multiple operators in arr
        if (moreThanOneOperators.test(arr.join(''))) {
            arr.splice(-2, 1);
            $('#display').text(arr.join(''));
        }

        //zero
        if (arr.join('').match(/^0\d+/)) {
            arr.splice(-2, 1);
            $('#display').text(arr.join(''));
        } else if (arr.join('').match(/[^0-9\.]0\d+/)) {
            arr.splice(-2, 1);
            $('#display').text(arr.join(''));
        } else if (arr.join('').match(/\.0/)) {
            $('#display').text(arr.join(''));
        }

        //display things
        $('#display').text(arr.join(''));

    });


    //dealing with decimals
    $('#decimal').click(function () {

        var lastnum = arr.join('').match(/\.\d+$/);

        if (/[^0-9]$/.test(arr)) {
            $('#display').text(arr.join(''));
        } else if (arr.length == 0) {
            arr.splice(0, 0, "0.");
            $('#display').text(arr.join(''));
        } else {
            arr.splice(arr.length, 0, ".");
            $('#display').text(arr.join(''));
        }


        //first try
        /*           var ori = '';
                     if (arr.join('').replace(/[^.]/g, "").length > 1){
                            var abc=[];
                         for(var i=0;i<arr.length;i++){
                            
                         }
                     } else {
                         $('#display').text(arr.join(''))
                     }
        */


        /*
                //second try
                //till yet it is clear that it inclueds a ecimal an then it does the things
                //all u wwnt to do is create an if statement in which i the arry includes 
                if(arr.join('').includes('.')){
                    
                    console.log("arr",arr);
                
                    //arr.slice(0,-1);
                    console.log(arr.slice(0,-1));
                    //arr.splice(-1,1);
                   
                    $('#display').text(arr.join(''));
                }
        */


        //problem herre == cannot read property  join of null

        if (lastnum.join('').split('').includes('.')) {
            arr.splice(-1, 1);
            $('#display').text(arr.join(''));
        }

    });


    //dealing with negative numbers
    $('#minus-plus').click(function () {

        var lastnums = arr.join('').match(/\d+?\.?\d{1,}$/);
        var minuslastnums = arr.join('').match(/-\d+?\.?\d{0,}$/); //-numbers

        if (!moreThanOneOperators.test(arr)) {
            if (minuslastnums) {
                arr.splice(-minuslastnums.join('').split('').length, 1);
                $('#display').text(arr.join(''));
            }
            if (arr.length == 0) {
                arr.splice(0, 0, "-0");
                $('#display').text(arr.join(''));
            } else if (lastnums) {
                arr.splice(-lastnums.join('').split('').length, 0, '-');
                $('#display').text(arr.join(''));
            } else if (lastnums == null) {
                arr.splice(-1, 0, "-");
                $('#display').text(arr.join(''));
            }
        }
    });

    //AC
    $('#clear').click(function () {
        $('#display').text('0');
        arr.splice(0, arr.length);
    });

    //back
    $('#back').click(function () {
        if (arr.length == 0) {
            $('#display').text("0");
        } else {
            arr.splice(-1, 1);
            $('#display').text(arr.join(''));
        }
    });


    //equals
    $('#equals').click(function () {
        var x = arr.join('');
        var solution = eval(x);

        if (solution.toString().length > 13) {
            var solArr = solution.toString().split('');
            var restOfArr = solArr.splice(10, 100, 'e');
            solArr.splice(solArr.length, 0, restOfArr.length);
            $('#display').text(solArr.join(''));
        } else {
            $('#display').text(solution);
        }
        arr.splice(0, arr.length, solution);
    });



});