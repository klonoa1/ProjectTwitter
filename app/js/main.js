$(document).ready(function(){
        
    var getDate = function(){
        var d = new Date(),
            day = d.getDate(),
            hrs = d.getHours(),
            min = d.getMinutes(),
            sec = d.getSeconds(),
            month = d.getMonth();
            year = d.getFullYear();

        var monthArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");

        //var actualDate = day + ' ' + monthArray[month] + ' ' + year + ' года' + hrs + ' часов' + min + ' минут';
        var actualDate = `${day} ${monthArray[month]} ${year} года ${hrs} часов ${min} минут`;
        
        return actualDate;    
    }
    
    var countTweets = function(){
        var tweetCounter = $('.tweet-card').length;
        $('#tweetsCounter').text(tweetCounter);
    }
    
    
    var wrapURLs = function (text, new_window) {
      var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
      var target = (new_window === true || new_window == null) ? '_blank' : '';

      return text.replace(url_pattern, function (url) {
        var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
        var href = protocol_pattern.test(url) ? url : 'http://' + url;
        return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
      });
    };
    
    var createTweet = function(date, text){
        var $tweetBox = $('<div class="card tweet-card">'); // Создаём обёртку для твита
        var $tweetDate = $('<div class="tweet-date">').text( date ); // Создаём дату
        var $tweetText = $('<div class="tweet-text">').html( wrapURLs(text) ).wrapInner('<p></p>'); // Создаём контент с Твитом
        
        var additionalClassName;
        if ( text.length < 100) {
            additionalClassName = 'font-size-large';
        } else if ( text.length > 150 )  {
            additionalClassName = 'font-size-small';
        } else {
            additionalClassName = 'font-size-normal';
        }
        $tweetText.addClass(additionalClassName);
        
        $tweetBox.append($tweetDate).append($tweetText); // Получаем разметку твита с датой и текстом твита
        $('#tweetsList').prepend($tweetBox);
        countTweets();
    }
    
    var tweetsBase = [ 
            {
                date: '17 фев. 2018 г.',
                text: 'Создай свой первый сайт на HTML5 и CSS3 - http://webcademy.ru/htmlsite/'
            },
            {
                date: '15 фев. 2018 г.',
                text: 'Страница 404 не найдена.'  
            },
            {
                date: '12 фев. 2018 г.',
                text: 'Хотел поговорить с утопленником, а он как будто воды в рот набрал.'
            },
            {
                date: '10 фев. 2018 г.',
                text: 'Их было 4, 4 днк полимеразы, как энхансер и сайленсер, как активатор и терминатор. 1 пацан страшно тупил, с 5 штриха конца однажды затусил, фрагменты оказаки злыми парнями оказались, фрагменты оказаки- страшная сила. 2 пацан хеликазу больше жизни любил, но когда на другой цепи днк ее увидел, апоптоз запустил. Третий пацан по мутациям угорал. Не заметил как инфузорией стал. Четвертый пацан оставшись один, сказал. Днк- я с вами.'
            },
        ];
    
    tweetsBase.forEach( function(tweet){
        createTweet(tweet.date, tweet.text);
    });
    
    
    // Форма отправки твита
    $('#postNewTweet').on('submit', function(e){
        e.preventDefault(); // Отменяем отправку формы
        var tweetText = $('#tweetText').val(); // Получает текст твита
        createTweet( getDate(), tweetText);
        $('#tweetText').val('');    
    });
    
    
});