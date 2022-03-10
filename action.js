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
    
});

$('.edit').click(function(){
    var id = this.id;
    var message = $('.message');
    if(!$(this).hasClass('active')){
        message.each(function(){
            var data_id = $(this).attr('data-id');
            
            if(id == data_id){
                var messageContain = $(this).find('div.contains div.body p.messageContain');
                
                var data = messageContain.text();
                var html = '<textarea name="" data-id="'+id+'" id="" class="addComment editcomment">'+data+'</textarea><button class="send update" data-id="'+id+'">Update</button>';
                messageContain.after(html);
                messageContain.css('visibility','hidden');
                messageContain.css('height','0');
            }
        });
        $(this).toggleClass('active');
    }
});

$('.delete').click(function(){
    var id = this.id;
    $('.deleteBtn').attr('data-id',id);
    $('.modal').toggleClass('opened');
});

$('.cancel').click(function(){
    $('.modal').toggleClass('opened');
    $('.deleteBtn').removeAttr('data_id');
})
$('.deleteBtn').click(function(){
    var id = $(this).attr('data-id');
    var message = $('.message');
    message.each(function(){
        var data_id = $(this).attr('data-id');
        if(id == data_id){
            $(this).hide();
        }
    });
    var netedmessage = $('.neted-message');
    netedmessage.each(function(){
        var data_id = $(this).attr('data-id');
        if(id == data_id){
            $(this).hide();
        }
    });
    $('.modal').toggleClass('opened');
});
