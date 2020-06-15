// Add more raiders here assface

// Clowns
let server = 'magtheridon';
let twisting = 'twisting-nether';
let tm = 'tarren-mill';

var characters = [
    { char: 'Holyhipster', server: server },
    { char: 'Siladil', server: server },
    { char: 'Oihu', server: server },
    { char: 'Fillää', server: server },
    { char: 'Electrodrel', server: server },
    { char: 'Dethfairy', server: server },
    { char: 'Reminiscer', server: server },
    { char: 'Calleb', server: server },
    { char: 'Trashydh', server: server },
    { char: 'Legi', server: server },
    { char: 'Aliná', server: server },
    { char: 'Tommywiseau', server: server },
    { char: 'Jinah', server: server },
    { char: 'Killshot', server: server },
    { char: 'Downsyndruíd', server: server },
    { char: 'Tyraeia', server: server },
    { char: 'Mikez', server: server },
    { char: 'Aevarr', server: server },
    { char: 'Quacky', server: server },
    { char: 'Jasperx', server: server },
    { char: 'Raliator', server: server },
    { char: 'Droidfisthed', server: twisting },
    { char: 'Rougefist', server: twisting },
    { char: 'Shandh', server: tm },
];

// console.log( characters );

var container = document.getElementById( 'container' );
var profile_link;
var color;
var playerClass;
var sinceLast;
var rowClass = '';

var classColors = {
    'Death Knight': '#C41F3B',
    'Druid': '#FF7D0A',
    'Hunter': '#ABD473',
    'Mage': '#69CCF0',
    'Monk': '#00FF96',
    'Paladin': '#F58CBA',
    'Priest': '#FFFFFF',
    'Rogue': '#FFF569',
    'Shaman': '#0070DE',
    'Warlock': '#9482C9',
    'Warrior': '#C79C6E',
    'Demon Hunter': '#A330C9'
};

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function hasData( obj ) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return true;
    }
    return false;
}

characters.forEach( function( char ) {
    
    let url = 'https://raider.io/api/v1/characters/profile?region=eu&realm=' + char.server + '&name='+ char.char +'&fields=mythic_plus_weekly_highest_level_runs';

    fetch(url).then(res => res.json()).then((out) => {

        var run1 = '';
        var run2 = '';
        var run3 = '';
        var date1 = '';
        var date2 = '';
        var date3 = '';
        var key1 = '';
        var key2 = '';
        var key3 = '';

        playerClass = out.class;
        color = classColors[playerClass];
        var charname = char.char;

        // Build charname into a link so it's clickable
        profile_link = '<span></span>';
        charTitle = '<h3 style="color:'+ color +'">' + char.char + '</h3>';

        // Run 1
        if( hasData( out.mythic_plus_weekly_highest_level_runs[0] ) ) {
            
            date1 = new Date( out.mythic_plus_weekly_highest_level_runs[0].completed_at );
            key1 = out.mythic_plus_weekly_highest_level_runs[0].mythic_level;

            if( date1 ) {

                var today = new Date();
                const diffTime = Math.abs(today - date1);
                const diffDays = Math.ceil( diffTime / (1000 * 60 * 60 * 24) );
    
                if( diffDays == 1 ) {
                    sinceLast = '<span> - Last run: ' + diffDays + ' day ago</span>';
                } else {
                    sinceLast = '<span> - Last run: ' + diffDays + ' days ago</span>';
                }
    
            }

            if( date1 ) {
                date1 = date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear();
            }
            

            run1 = '<span>Key: <strong>' + key1 + '</strong><br>When: ' + date1 + '</span>';
        }
    
        if(  hasData( out.mythic_plus_weekly_highest_level_runs[1] ) ) {

            date2 = new Date( out.mythic_plus_weekly_highest_level_runs[1].completed_at );
            key2 = out.mythic_plus_weekly_highest_level_runs[1].mythic_level;

            if( date2 ) {
                date2 = date2.getDate() + "-" + (date2.getMonth() + 1) + "-" + date2.getFullYear();
            }

            run2 = '<span>Key: <strong>' + key2 + '</strong><br>When: ' + date2 + '</span>';
            
        }

        if( hasData( out.mythic_plus_weekly_highest_level_runs[2] ) ) {

            date3 = new Date( out.mythic_plus_weekly_highest_level_runs[2].completed_at );
            key3 = out.mythic_plus_weekly_highest_level_runs[2].mythic_level;

            if( date3 ) {
                date3 = date3.getDate() + "-" + (date3.getMonth() + 1) + "-" + date3.getFullYear();
            }

            run3 = '<span>Key: <strong>' + key3 + '</strong><br>When: ' + date3+ '</span>';
            
        }

        var content = '';

        if( !run1 ) {
            content = '<h1>No keys done!</h1>';
            rowClass = 'warning';
        } else {

            if( key1 < 15 ) {
                content = '<h1>Keys are too low!</h1>';
                rowClass = 'warning';
            } else {
                content = '<h1>Done for the week!</h1>';
                rowClass = '';

            }

        }

        // Push all info into a row and then push into container
        var charContent = '';
        charContent += '<a href="' + char.profile_url + '" target="_blank" class="row '+ rowClass +'">';
        charContent += '<img src="' + out.thumbnail_url + '">';
        charContent += '<em class="name">' + charTitle + '</em>';
        charContent += '<em class="keys">' + content + '</em>';
        charContent += profile_link;
        charContent += '</a>';

        container.innerHTML += charContent;

    })
    .catch(err => { throw err });
    
});



// Get players highest key for the week
// Every wedneysday reset back to 0.