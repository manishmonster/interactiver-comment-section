$(document).on('click','.reply', function(){
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
                <textarea name="" id="" cols="30" rows="10" class="addComment" placeholder="Add a commet...."></textarea><button class="send">Send</button>\
              </div>\
            </div>';
                $(this).after(html);
            }
        });
        $(this).toggleClass('active');
    }
    
});

$(document).on('click','.edit', function(){
    var id = this.id;
    var message = $('.message');
    if(!$(this).hasClass('active')){
        message.each(function(){
            var data_id = $(this).attr('data-id');
            
            if(id == data_id){
                var messageContain = $(this).find('div.contains div.body p.messageContain');
                
                var data = messageContain.text();
                var html = '<textarea name="" data-id="'+id+'" id="" class="addComment editcomment" placeholder="Add a commet....">'+data+'</textarea><button class="send update" data-id="'+id+'">Update</button>';
                messageContain.after(html);
                messageContain.css('visibility','hidden');
                messageContain.css('height','0');
            }
        });
        $(this).toggleClass('active');
    }
});

$(document).on('click','.delete', function(){
    var id = this.id;
    $('.deleteBtn').attr('data-id',id);
    $('.modal').toggleClass('opened');
});

$(document).on('click','.cancel', function(){
    $('.modal').toggleClass('opened');
    $('.deleteBtn').removeAttr('data_id');
})
$(document).on('click','.deleteBtn', function(){
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

$.getJSON("./data.json", function(json) {
    var currentUser = json.currentUser;
    var username =  currentUser.username;
    var comments = json.comments;
    $('.chatreply .avatar img').attr('src',currentUser.image.png);
    var html = '';
    $.each(comments,function(i, comment){
        html += replyFunction(comment, username);
    });

    $('.chatting').html(html);
});
function replyFunction(comment, username){
    var html1= '<div class="message" data-id="'+comment.id+'">\
                    <div class="vote">\
                        <span class="plus"></span>\
                        <span class="votes">'+comment.score+'</span>\
                        <span class="minus"></span>\
                    </div>\
                    <div class="contains">\
                        <div class="head">\
                            <div class="left">\
                                <div class="avatar">\
                                    <img src="'+comment.user.image.png+'" alt="Default avatar ">\
                                </div>\
                                <span class="name">'+comment.user.username;
                                if(username == comment.user.username){
                                    html1 += '<span class="you">you</span>';
                                }
                                html1 +='</span> <span class="time">'+comment.createdAt+'</span>\
                            </div>\
                            <div class="right">';
                            if(username == comment.user.username){
                                html1 += '<a href="#" class="actions delete" id="'+comment.id+'"><span></span> Delete</a><a href="#" class="actions edit" id="'+comment.id+'"><span></span> Edit</a>';
                            }
                            else{
                                html1 += '<a href="#" class="actions reply" id="'+comment.id+'"><span></span> Reply</a>';
                            }
                            html1 += '</div>\
                        </div>\
                        <div class="body">\
                            <p class="messageContain">'+comment.content+'</p>\
                        </div>\
                    </div>\
                </div>';
    if(typeof comment.replies !== 'undefined' && comment.replies.length != 0){
        var html = '';
        html += '<div class="multiple-message">'+html1;
        html +=     '<div class="neted-message" data-id="'+comment.id+'">\
                        <div class="vl"></div>\
                        <div class="messages">';
            var replies = comment.replies;
            $.each(replies,function(i, reply){
                    html += replyFunction(reply, username);
            });
        html +=         '</div>\
                    </div>\
                </div>'; 
        return html;
    }
    return html1;

}