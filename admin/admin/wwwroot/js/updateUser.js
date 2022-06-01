﻿const logSubmit = async e => {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var identityCard = document.getElementById("identityCard").value;
    var idPlace = document.getElementById("workplace");
    var idUser = document.getElementById("IdUser").value;
    if (idPlace == null) //Update dùng chung cho profile và staff
        idPlace = 0;
    else
        idPlace = idPlace.value;
    
    //let checkName = /^[A-Z][a-z]{1,}(\s[A-Z][a-z]{1,})*$/;
    let checkName = /^\S*[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Z]+\S*/i;
    if (!checkName.test(name))
        document.getElementById("checkName").innerHTML = "Names can't have numbers";
    else
        document.getElementById("checkName").innerHTML = "";

    let checkEmail = /^[a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,}){1,3}$/;
    if (!checkEmail.test(email))
        document.getElementById("checkEmail").innerHTML = "Invalid email";
    else
        document.getElementById("checkEmail").innerHTML = "";

    let checkIdentityCard = /^[0-9]{13}$/;
    if (!checkIdentityCard.test(identityCard))
        document.getElementById("checkIdentityCard").innerHTML = "Identity card has 13 number";
    else
        document.getElementById("checkIdentityCard").innerHTML = "";


    var avatar = $("#inputGroupFile").get(0);
    var files = avatar.files;
    var formData = new FormData();
    formData.append('file', files[0]);


    if (checkName.test(name) && checkIdentityCard.test(identityCard)
        && checkEmail.test(email)) {
        var pathAvatar = ""
        await $.ajax({
            url: '/users/uploadFile',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                pathAvatar = res.pathFile
            }
        });

        const data = {
            email: email,
            name: name,
            password: "",
            identityCard: identityCard,
            avatar: pathAvatar,
            idPlace: parseInt(idPlace)
        }
        //console.log(data)
        const response = await fetch(`/users/${idUser}/Update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        if (result.msg == "successed")
            window.location.href = result.path
        else
            alert('Updating staff failed!')
    }
}

const form = document.getElementById("updateStaff");
form.addEventListener("submit", logSubmit);