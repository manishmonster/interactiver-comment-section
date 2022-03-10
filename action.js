$('.reply').click(function(){
    var id = this.id;
    var message = $('.message');
    
    if(!$(this).hasClass('active')){
        message.each(function(){
            var data_id = $(this).attr('data-id');
            if(id == data_id){
                var html = '<div class="chatreply generated">\
                <div class="avatar">\
                  <img src="images/avatars/image-juliusomo.png" alt="Default avatar ">\
                </div>\
                <textarea name="" id="" cols="30" rows="10" class="addComment"></textarea><button class="send">Send</button>\
              </div>\
            </div>';
                $(this).after(html);
            }
        });
        $(this).toggleClass('active');
    }
    
})