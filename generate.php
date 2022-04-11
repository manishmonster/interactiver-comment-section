<?php
include('connect.php');
function userInfo($userId){
	global $conn;
    $sqlUser = mysqli_query($conn, "SELECT * FROM user WHERE user_id = $userId") or die(mysqli_error($conn));
    $row = mysqli_fetch_object($sqlUser);
    return array(
        "image" =>array(
            "png" => "./images/avatars/".$row->png,
            "webp" => "./images/avatars/".$row->webp
        ),
        "username" => $row->username
    );
}

function commentInfo($rowInfo){
    return array(
        "id" => $rowInfo->comment_id,
        "content" => $rowInfo->comment_content,
        "createdAt" => "1 month ago",
        "score" => $rowInfo->score,
        "user" => userInfo($rowInfo->user_id),
        "replies" => reply($rowInfo->comment_id)
    );
}

function reply($replying_by){
	global $conn;
    $a = array();
    $sqlreply = mysqli_query($conn, "SELECT * FROM comment WHERE comment_id IN (SELECT replying_by FROM reply WHERE replying_to = $replying_by)") or die(mysqli_error($conn));
    if(mysqli_num_rows($sqlreply) != 0){
        while($row = mysqli_fetch_object($sqlreply)){
            $a[] = commentInfo($row);
        }
    }
    return $a;
}

$sql = mysqli_query($conn, "SELECT * FROM comment WHERE comment_id NOT IN (SELECT replying_by FROM reply) ORDER BY createdat ASC") or die(mysqli_error($conn));
$array = array(
    "currentUser" => userInfo(1)
);
$comment =  array();
while($row = mysqli_fetch_object($sql)){
    $comment[] = commentInfo($row);
}
$array['comments'] = $comment;
echo json_encode($array);
?>