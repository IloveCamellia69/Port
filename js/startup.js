/* var apiURL = "http://localhost:8888/making-a-difference-21/ajax.php"; */
// var apiURL = "https://bmd1r6-2021j.designstudent.nz/ajax.php";

(function($){
    
    $.fn.startMeUp = function(){
        
        return this.each(function(){
            
            var $body = $(this),
                /*find only buttons with data-ownername attribute*/
                $btn = $body.find('button'),
                $modal = $('<div class="modal">'),
                ownername = $btn.last().data('ownername'),
                themeColor = "#fff",
                buttonColor = "#0E9C33",
                buttonHoverColor = "#25BF58",
                textColor = "#333333",
                formTemplate = [
                    '<form action="">',
                        '<div class="wrapper">',
                            '<h2>Pledge Your Support for This Project</h2>',
                            '<p class="status">&nbsp;</p>',
                            '<div class="options">',
                                '<div><input type="radio" name="amount" value="25000" required><label>$25,000</label></div>',
                                '<div><input type="radio" name="amount" value="50000"><label>$50,000</label></div>',
                                // '<div><input type="radio" name="amount" value="75000"><label>$75,000</label></div>',
                                '<div><input type="radio" name="amount" value="75000"><label>$75,000</label></div>',
                            '</div>',
                            '<div class="btn">',
                                '<input type="submit" value="Pledge">',
                            '</div>',
                            '<input type="hidden" name="action" value="pledge">',
                            '<input type="hidden" name="ownername" value="{{ownername}}">',
                        '</div>',
                        '<div class="close-btn">+</div>',
                    '</form>'
                ].join("");

                //&#10005
            function createModal() {
                var form = formTemplate.replace("{{ownername}}", ownername);
                $modal.html(form);
                $modal.css({
                    display:'block',
                    position: 'fixed',
                    height: '100vh',
                    top: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,.85)',
                    opacity: 0,
                    'z-index': 1000
                });

                $modal.find('form').css({
                    width: 610,
                    height: 400,
                    backgroundColor: themeColor,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: 25
                });

                $modal.find('.wrapper').css({
                    display: 'block',
                    width: 480,
                    marginTop: 50,
                    marginBottom: 50,
                    marginLeft: 60,
                    color: '#333'
                });

                $modal.find('.wrapper .options').css({
                    marginLeft: '20px'
                })
                

                $modal.find('.wrapper div').css({
                    margin: '20px 0'
                });
                
                $modal.find('.wrapper h2').css({
                    color: 'black',
                    margin: '2.5em 0 1.7em 0',
                });

                $modal.find('input[type=text]').css({
                    width: '100%',
                    height: 40,
                    fontSize: 20,
                    lineHeight: '40px'
                });

                $modal.find('input[type=radio]').css({
                    height: 20,
                    width: 20
                });

                $modal.find('label').css({
                    fontSize: 24,
                    lineHeight: 1,
                    marginLeft: 20,
                    color: 'black'
                });

                $modal.find('input[type=submit]').css({
                    height: 40,
                    width: 160,
                    backgroundColor: buttonColor,
                    border: 'none',
                    borderRadius: 3,
                    fontSize: 22,
                    backgroundImage: 'linear-gradient(to right, #FF30E3, #FF4A71)',
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '1px 1px 2px 0px rgba(0,0,0,0.35)',
                    borderRadius: '25px'
                });

                $modal.find('input[type=submit]').hover(function(){
                    $(this).css({
                        backgroundColor: buttonHoverColor
                    })
                },function(){
                    $(this).css({
                        backgroundColor: buttonColor
                    })
                });

                $modal.find('.status').css({
                    display: 'none',
                    fontSize: 22,
                    color: 'white'
                });

                $modal.find('.close-btn').css({
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    color: 'black',
                    width: 50,
                    height: 50,
                    fontSize: 30,
                    padding: 0,
                    fontSize: 60,
                    lineHeight: '50px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    transform: 'rotate(45deg)',
                });

            }

            function addModal() {
                $body.append($modal);
                $modal.animate({
                    opacity: 1
                }, 200);
            }

            function removeModal() {
                $modal.remove();
                resetForm();
            }

            function resetForm() {
                $modal.find('form')[0].reset();
            }

            createModal();

            $btn.click(function (e) {
                e.preventDefault();
                addModal();
            });

            $body.on('click', '.modal, .close-btn', function (e) {
                if (e.currentTarget === e.target) {
                    removeModal();
                }
            })

            $body.on('submit', '.modal form', function (e) {
                e.preventDefault();
                var formData = $(this).serialize();
               // alert(formData);
                $.post(apiURL, formData, function(status){
                    $modal.find('.status').html(status).slideDown(200);
                    resetForm();
                })

            })
            
        });
        
    }
 
})(jQuery);

$(function(){
    $('body').startMeUp();
})