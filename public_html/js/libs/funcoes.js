
alert = function (e) {
    var m = "";
    var x = e.split('\n');
    if (x.length > 0) {
        for (var n in x) {
            m += "<div>" + x[n] + "</div>";
        }
    }
    m += "<div><button type=\"button\" onclick=\"limparalerta()\" class=\"btn btn-info form-control\">Limpar alerta</button></div>";
    $('#alerta').html(m);
};

function limparalerta() {
    $('#alerta').html('');
}

var libera = 0;
var processos = new Array();
var travaProcesso = true;
var libera = 0;


function dadosCY(item) {
    return JSON.parse(JSON.stringify(item));
}

function pegaIndice(d, x) {
    for (var m in d) {
        if (m === x) {
            return  parseInt(x) + 1;
        }
    }
}

function giraBarradeProgresso(t) {
    t = parseInt(t) * 1000;
    $('#xtempo').css({width: "0%"});
    $('#xtempo').animate({
        width: "100%"}, {
        queue: false,
        duration: t
    }, function () {
        $('#xtempox').html("Execução concluída!");
    });
}

function  sjfArray(p, i, d, c, pg) {
    var status = new Array();
    status[0] = "<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>";
    status[1] = "<div style=\"background-color:yellow;color:#990000;text-align:center;color:red;font-weight:bolder;\">Pronto</div>";
    status[2] = "<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>";


    if (c < status.length) {
        window.setTimeout(function () {
            c++;
            sjfArray(p, i, d, c, pg);
        }, 1000);
    } else {

        if (pg !== "") {
            if (c == status.length) {
                window.setTimeout(function () {
                    $('#idx' + (i + 2)).html(status[1]);
                    console.log(pg + 1);
                }, 1000);

            }
        }
        $('#idx' + (i + 1)).html(status[2]);


        iniciaSjf(p, i, d);
    }

}

function pegaValorArray(obj, val) {
    for (var chave in obj) {
        if (obj[chave] === val && obj.hasOwnProperty(chave)) {
            return chave;
        }
    }
}


function  statusSJF(p, i, d, c, pg) {
    var status = new Array();
    status[0] = "<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>";
    status[1] = "<div style=\"background-color:yellow;color:#990000;text-align:center;color:red;font-weight:bolder;\">Pronto</div>";
    status[2] = "<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>";
    $('#idx' + (i + 1)).html(status[c]);

    if (pg !== "") {
        if (c == status.length) {
            window.setTimeout(function () {
                $('#idx' + (pg + 1)).html(status[1]);
            }, 1000);
        }
    }
    if (c < status.length) {
        window.setTimeout(function () {
            c++;

            statusSJF(p, i, d, c, pg);
        }, 1000);
    } else {
        iniciaSjf(p, i, d);
    }

}

function iniciaSjf(p, i, d) {


    var tempo;

    var html = "<table class=\"table table-condensed table-hover\"><thead>";
    html += "<tr><td></td><td>Nome</td><td>Prioridade</td><td>Tempo</td><td>Status</td></tr>";

    html += "</thead><tbody>";
    var status;


    var im = "";

    for (var x in p) {
        if (p[x]['processo'] === d[i]['processo']) {
            tempo = parseInt(p[x]['tempo']);

            status = "<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>";
        } else {
            status = "<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>";
        }
        var ii;
        for (var xx in d) {
            if (p[x]['processo'] === d[xx]['processo']) {
                ii = parseInt(xx);
                break;
            }
        }


        if (p[x]['processo'] === d[i]['processo']) {

            html += "<tr><td>" + (parseInt(x) + 1) + "</td><td>" + p[x]["processo"] + "</td><td>" + p[x]["prioridade"] + "</td><td>" + p[x]["tempo"] + "</td><td><div id=\"idec\"><div id=\"idx" + (ii + 1) + "\" class=\"exe\">" + status + "</div></div></td></tr>";

            html += "<tr>\n\
<td colspan='5' id='campox'>\n\
<div class=\"progress\">\n\
<div class=\"progress-bar progress-bar-primary progress-bar-striped active\" role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" id=\"xtempo\"></div>\n\
</div>\n\
</td>\n\
</tr>";
        } else {
            html += "<tr><td>" + (parseInt(x) + 1) + "</td><td>" + p[x]["processo"] + "</td><td>" + p[x]["prioridade"] + "</td><td>" + p[x]["tempo"] + "</td><td><div id=\"idx" + (ii + 1) + "\" class=\"exe\">" + status + "</div></td></tr>";

        }

    }

    html += "</tbody></table>";
    $("#conteudos").html(html);
    this.libera++;
    if (this.libera === 1) {
        var pg = "";


        if (d.length > 1) {
            statusSJF(p, parseInt(i), d, 0, parseInt(i) + 1);
        } else {
            statusSJF(p, i, d, 0, pg);
        }
    } else {

        if (p.length <= 1) {

            $("#xtempo").animate({'width': "100%"}, (tempo * 1000), function () {
                $("#idx1").html("<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>");
                window.setTimeout(function () {
                    travaProcesso = true;
                    $('#xtempo').html("Processo finalizado!");
                    $('#xtempo').removeClass("active");
                    $("#idx1").html("<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>");
                }, tempo * 1000);
            });
        } else {

            $("#xtempo").animate({'width': "100%"}, (tempo * 1000), function () {
                $("#idx" + (i)).html("<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>");

                if (i < d.length - 1) {

                    sjfArray(p, i + 1, d, 1, i + 1);
                } else {
                    $("#idx" + (i + 1)).html("<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>");
                    window.setTimeout(function () {
                        travaProcesso = true;
                        $('#xtempo').html("Processo finalizado!");
                        $('#xtempo').removeClass("active");
                        $("#idx" + (i + 1)).html("<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>");
                    }, tempo * 1000);
                }

            });


        }
    }
}








function sjf() {
    if (this.travaProcesso) {
        this.travaProcesso = false;
        var tmp = new Array();
        tmp = dadosCY(this.processos);
        var p = misturaSjf(processos);
        iniciaSjf(tmp, 0, p);
    }
}



function misturaSjf(a) {
    var tmp = new Array();
    tmp = dadosCY(a);
    tmp.sort(colocaEmOrdem("prioridade"));
    return tmp;
}

function  colocaEmOrdem(campo) {
    return function (a, b) {
        var ax = a[campo], bx = b[campo];
        return ax < bx ? 1 : (ax > bx ? -1 : 0);
    };
}


function statusfifo(p, i, c, pr) {
    var status = new Array();
    status[0] = "<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>";
    status[1] = "<div style=\"background-color:yellow;color:#990000;text-align:center;color:red;font-weight:bolder;\">Pronto</div>";
    status[2] = "<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>";
    $('#idx' + (i + 1)).html(status[c]);

    if (pr !== "") {
        if (c == status.length) {
            window.setTimeout(function () {
                $('#idx' + (pr + 1)).html(status[1]);
            }, 1000);
        }
    }
    if (c < status.length) {
        window.setTimeout(function () {
            c++;
            statusfifo(p, i, c, pr);
        }, 1000);
    } else {
        iniciar_fifo(p, i);
    }
}



function statusfifoMatriz(p, i, c, pr) {
    var status = new Array();
    status[0] = "<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>";
    status[1] = "<div style=\"background-color:yellow;color:#990000;text-align:center;color:red;font-weight:bolder;\">Pronto</div>";
    status[2] = "<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>";


    if (c < status.length) {
        window.setTimeout(function () {
            c++;
            statusfifoMatriz(p, i, c, pr);
        }, 1000);
    } else {
        if (pr !== "") {
            if (c == status.length) {
                window.setTimeout(function () {
                    $('#idx' + (pr + 1)).html(status[1]);
                }, 1000);
            }
        }

        $('#idx' + (i + 1)).html(status[2]);
        iniciar_fifo(p, i);
    }
}



function iniciar_fifo(px, i) {

    var tempo;

    var html = "<table class=\"table table-condensed table-hover\"><thead>";
    html += "<tr><td></td><td>Nome</td><td>Prioridade</td><td>Tempo</td><td>Status</td></tr>";

    html += "</thead><tbody>";
    var status;
    for (var x in px) {
        if (x == i) {
            tempo = parseInt(px[i]['tempo']);
            status = "<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>";
        } else {
            status = "<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>";
        }

        if (x == i) {
            html += "<tr><td>" + (parseInt(x) + 1) + "</td><td>" + px[x]["processo"] + "</td><td>" + px[x]["prioridade"] + "</td><td>" + px[x]["tempo"] + "</td><td><div id=\"idec\"><div id=\"idx" + (parseInt(x) + 1) + "\" class=\"exe\">" + status + "</div></div></td></tr>";

            html += "<tr>\n\
<td colspan='5' id='campox'>\n\
<div class=\"progress\">\n\
<div class=\"progress-bar progress-bar-primary progress-bar-striped active\" role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" id=\"xtempo\"></div>\n\
</div>\n\
</td>\n\
</tr>";
        } else {
            html += "<tr><td>" + (parseInt(x) + 1) + "</td><td>" + px[x]["processo"] + "</td><td>" + px[x]["prioridade"] + "</td><td>" + px[x]["tempo"] + "</td><td><div id=\"idx" + (parseInt(x) + 1) + "\" class=\"exe\">" + status + "</div></td></tr>";

        }
    }
    html += "</tbody></table>";
    $("#conteudos").html(html);
    this.libera++;

    if (this.libera === 1) {
        var pr = "";
        if (px[(parseInt(i) + 1)]) {
            pr = (parseInt(i) + 1);
        }
        statusfifo(px, i, 0, pr);
    } else {
        if (px.length <= 1) {

            $("#xtempo").animate({'width': "100%"}, (tempo * 1000), function () {
                $("#idx1").html("<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>");
                window.setTimeout(function () {
                    travaProcesso = true;
                    $('#xtempo').html("Processo finalizado!");
                    $('#xtempo').removeClass("active");
                    $("#idx1").html("<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>");
                }, tempo * 1000);
            });
        } else {

            $("#xtempo").animate({'width': "100%"}, (tempo * 1000), function () {
                $("#idx" + (i)).html("<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>");

                if (i < px.length - 1) {
                    var pr = "";
                    if (px[(parseInt(i) + 2)]) {
                        pr = (parseInt(i) + 2);
                    }
                    statusfifoMatriz(px, i + 1, 1, pr);
                } else {
                    $("#idx" + (i + 1)).html("<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>");
                    window.setTimeout(function () {
                        travaProcesso = true;
                        $('#xtempo').html("Processo finalizado!");
                        $('#xtempo').removeClass("active");
                        $("#idx" + (i + 1)).html("<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>");
                    }, tempo * 1000);
                }

            });


        }




    }
}



function   fifo() {
    if (this.travaProcesso) {
        this.travaProcesso = false;
        iniciar_fifo(dadosCY(this.processos), 0);
    }
}


function altera_status(proximo, atual, tempo, todos) {
    atual = parseInt(atual);
    proximo = parseInt(proximo) + 1;
    for (var n in todos) {
        $("#idx" + (n + 1)).html("<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>");
    }
    var t = parseInt(tempo) * 1000 / 2;
    $("#idx" + proximo).html("<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>");
    window.setTimeout(function () {
        $("#idx" + proximo).html("<div style=\"background-color:yellow;color:#990000;text-align:center;color:red;font-weight:bolder;\">Pronto</div>");
    }, t);
    $("#idx" + (atual + 1)).html("<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>");
}


function trocar_status(p, i, c) {
    var status = new Array();
    status[0] = "<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>";
    status[1] = "<div style=\"background-color:yellow;color:#990000;text-align:center;color:red;font-weight:bolder;\">Pronto</div>";
    status[2] = "<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>";
    $('#idx' + (i + 1)).html(status[c]);
    if (c < status.length) {
        window.setTimeout(function () {
            c++;
            trocar_status(p, i, c);
        }, 1000);
    } else {
        iniciar_circular(p, i);
    }
}


function giraBarradeProgressoLimite(t, l, i) {
    var p = ((parseInt(l) + parseInt(i)) * 100) / parseInt(t);
    if (p > 100) {
        p = 100;
    }
    i = ((parseInt(i)) * 100) / parseInt(t);
    t = parseInt(t) * 1000;
    $('#xtempo').css({
        width: i + "%"});
    $('#xtempo').animate({
        width: p + "%"}, {
        queue: false,
        duration: t
    }, function () {
    });
}




function iniciar_circular(p, i) {
    var ii;
    this.libera++;
    var tempo = parseInt(p[i]['tempo']);
    var limite = parseInt(p[i]['limite']);

    var html = "<table class=\"table table-condensed table-hover\"><thead>";
    html += "<tr><td></td><td>Nome</td><td>Prioridade</td><td>Tempo</td><td>Status</td></tr>";

    html += "</thead><tbody>";
    var status = "";
    var ids = new Array();
    for (var x in p) {
        ids.push({id: i, x: (parseInt(x) + 1), t: p[x]['limite']});
        if (p.length === 1) {
            if (x === i) {
                status = "<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>";
            } else if (status === "<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>") {
                status = "<div style=\"background-color:yellow;color:#990000;text-align:center;color:red;font-weight:bolder;\">Pronto</div>";
            } else {
                status = "<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>";
            }
        } else {
            status = "<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>";
        }
        if (x == i) {
            html += "<tr><td>" + (parseInt(x) + 1) + "</td><td>" + p[x]["processo"] + "</td><td>" + p[x]["prioridade"] + "</td><td>" + p[x]["tempo"] + "</td><td><div id=\"idec\"><div id=\"idx" + (parseInt(x) + 1) + "\" class=\"exe\">" + status + "</div></div></td></tr>";
            html += "<tr>\n\
<td colspan='5' id='campox'>\n\
<div class=\"progress\">\n\
<div class=\"progress-bar progress-bar-primary progress-bar-striped active\" role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" id=\"xtempo\"></div>\n\
</div>\n\
</td>\n\
</tr>";
            ii = x;
        } else {
            html += "<tr><td>" + (parseInt(x) + 1) + "</td><td>" + p[x]["processo"] + "</td><td>" + p[x]["prioridade"] + "</td><td>" + p[x]["tempo"] + "</td><td><div id=\"idx" + (parseInt(x) + 1) + "\" class=\"exe\">" + status + "</div></td></tr>";

        }
    }
    html += "</tbody></table>";
    $("#conteudos").html(html);

    if (this.libera === 1) {
        trocar_status(p, i, 0);

    } else {

        giraBarradeProgressoLimite(tempo.toString(), limite.toString(), p[i]['carregado']);

        p[i]['carregado'] = parseInt(p[i]['carregado']) + parseInt(p[i]['limite']);

        $('#idx' + (i + 1)).html("<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>");


        if (p.length <= 1) {
            if (p.length <= 1 && tempo > p[i]['carregado']) {
                window.setTimeout(function () {
                    trocar_status(p, parseInt(i), 0);
                }, tempo * 1000);
            } else {

                $("#idx1").html("<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>");
                window.setTimeout(function () {
                    travaProcesso = true;
                    $('#xtempo').html("Processo finalizado!");
                    $('#xtempo').removeClass("active");
                    $("#idx1").html("<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>");
                }, tempo * 1050);
            }
        } else {
            var ex = false;

            for (var m in p) {
                if (p[m]['carregado'] < p[m]['tempo']) {
                    ex = true;
                    break;
                }
            }

            if (ex) {

                var mx = i;

                if (p.length - 1 > i) {
                    i++;
                } else {
                    i = 0;
                }

                if (p[i]["tempo"] <= p[i]["carregado"]) {
                    for (var m in p) {
                        if (p[m]["carregado"] < p[m]["tempo"]) {
                            i = m;
                            break;
                        }
                    }
                }


                if (p.length > 1) {
                    if (parseInt(i) === parseInt(mx)) {

                    } else {
                        altera_status(parseInt(i), parseInt(mx), parseInt(p[i]["tempo"]), p);
                    }
                }



                window.setTimeout(function () {
                    if (p.length > 1) {

                        if (parseInt(i) !== parseInt(mx)) {
                            iniciar_circular(p, i);
                        } else {

                            trocar_status(p, parseInt(mx), 0);
                        }

                    } else {
                        if (p.length <= 1) {
                            trocar_status(p, parseInt(mx), 0);
                        }
                    }
                }, tempo * 1000);






            } else {

                $("#idec").html("<div style=\"background-color:green;text-align:center;color:white;font-weight:bolder;\" id=\"exe\">Execução</div>");

                window.setTimeout(function () {
                    travaProcesso = true;
                    $('#xtempo').html("Processo finalizado!");
                    $('#xtempo').removeClass("active");
                    $("#idec").html("<div style=\"background-color:#d1d1d1;text-align:center;color:white;font-weight:bolder;\">Espera</div>");
                }, tempo * 1050);
            }
        }

    }
}

function circular() {
    if (travaProcesso) {
        travaProcesso = false;
        $("#conteudos").html('');
        var erro = false;
        var v = dadosCY(this.processos);
        for (var m in v) {
            v[m]['carregado'] = 0;
            v[m]['utilizado'] = parseInt(v[m]["tempo"]);
            v[m]['tempo'] = parseInt(v[m]["tempo"]);
            if (v[m]["limite"] < 1) {
                erro = true;
            }
        }
        if (!erro) {
            iniciar_circular(v, 0);
        } else {
            alert("Por favor edite os processo e acrescente o \"Limite\"!");
        }
    }
}



function processar_algoritmo() {
    $("#conteudos").html('');
    this.libera = 0;
    var d = $('#select').val();
    switch (d) {
        case 'fifo':
            fifo();
            break;
        case 'sjf':
            sjf();
        case 'circular':
            circular();
            break;
        default:
            alert("Por favor selecione um algoritmo!");
    }
}





function editar_dados(i) {
    if (this.processos.length > 0) {

        iniciarBotao("iniciar");
        $('#processo').val(this.processos[i]["processo"]).attr({"readonly": "readonly"});
        $('#prioridade').val(this.processos[i]["prioridade"]);
        $('#tempo').val(this.processos[i]["tempo"]);
        $('#limite').val(this.processos[i]["limite"]);

    }
}


function apagar_dados(i) {
    var c = this.processos[i];
    if (confirm("Você deseja apagar o processo \"" + c.processo + "\"?")) {
        this.processos.splice(i, 1);
        if (processos.length > 0) {
            var temp = new Array();
            for (var x in this.processos) {
                temp.push(processos[x])
            }
            this.processos = new Array();
            this.processos = temp;
            this.backupprocessos = new Array();
            this.backupprocessos = this.processos;
        }

    }
    iniciarBotao("");
    mostrarP();
}


function mostrarP() {
    var html = "";
    if (this.processos.length > 0) {
        var i = 1;
        html += "<table class='table table-condensed table-hover'><thead><tr><th>Processo:</th></th><th>Prioridade</th><th></th><th></th></tr></head><tbody>";
        for (var item in this.processos) {
            html += "<tr><td>" + this.processos[item].processo + "</td><td>" + this.processos[item].prioridade + "</td><td title='Editar'><a href=\"javascript:void(0)\" onclick=\"editar_dados('" + item + "');\" >E</a></td><td><a href=\"javascript:void(0)\" onclick=\"apagar_dados('" + item + "')\" title=\"Apagar\">X</a></td></tr>";
        }
        html += "</tbody></table>";
        html += "<select class=\"btn btn-danger form-control\" id=\"select\"><option value=\"\">Selecione o algoritmo</option>\n\
    <option value=\"fifo\">Fifo</option>\n\
    <option value=\"circular\">Circular</option>\n\
    <option value=\"sjf\">SJF</option>\n\
</select>";
        html += "<input type=\"button\" value=\"Inciar Processo\" class=\"btn btn-primary form-control\" onclick=\"processar_algoritmo()\">";
    }
    jQuery("#processosCadastrados").html(html);
}



function iniciarBotao(c) {
    switch (c) {
        case "iniciar":
            var r = criar_processo();
            $('#titulo').html(r.titulo);
            $('#campo').html(r.campo);
            $('#botoes').html(r.botoes);
            break;
        default:
            $('#titulo').html('');
            $('#campo').html('');
            $('#botoes').html('');
    }
}


function criar_processo() {
    var html = "";
    html += "<input type=\"text\" placeholder=\"Nome do processo\" class=\"form-control\" id=\"processo\" >";
    html += "<label for=\"prioridade\">Prioridade</label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"prioridade\" >";
    html += "<label for=\"tempo\">Tempo de execução</label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"tempo\" >";
    html += "<label for=\"limite\">Limite* <small><small>No caso do metódo circular.</small></small></label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"limite\" >";
    var btn = "<button type=\"button\" class=\"btn btn-default form-control\" onclick=\"iniciarBotao('');\">Fechar</button>\n\
<button type=\"button\" onclick=\"salva_processo()\" class=\"btn btn-danger form-control\">Salvar</button>";
    return {campo: html, botoes: btn};
}


function salva_processo() {
    var processo = $('#processo').val().trim();
    var prioridade = $('#prioridade').val().trim().replace("/[^0-9]/g", "");
    var tempo = $('#tempo').val().trim().replace("/[^0-9]/g", "");
    var limite = $('#limite').val().trim().replace("/[^0-9]/g", "");
    var erro = false;
    var mensagem = "";
    if (processo === "") {
        erro = true;
        mensagem += "Por favor, digite o nome do processo!";
    }
    if (tempo <= 0) {
        erro = true;
        if (mensagem.length > 0) {
            mensagem += "\n";
        }
        mensagem += "Por favor, insira um tempo válido!";
    }
    if (limite !== "") {
        if (parseInt(limite) > parseInt(tempo)) {
            erro = true;
            if (mensagem.length > 0) {
                mensagem += "\n";
            }
            $('#limite').val("");
            mensagem += "O limite não pode ser maior do que o temp total!";
        }
    }
    if (!(prioridade > 0 && prioridade <= 5)) {
        erro = true;
        if (mensagem.length > 0) {
            mensagem += "\n";
        }
        mensagem += "Por favor, prioridade entre 1 e 5!";
    }
    if (erro) {
        alert(mensagem);
    } else {
        var ok = true;
        if (this.processos.length > 0) {
            for (var m in this.processos) {
                if (this.processos[m].processo === processo) {
                    this.processos[m].processo = processo;
                    this.processos[m].tempo = tempo;
                    this.processos[m].prioridade = prioridade;
                    this.processos[m].limite = limite;
                    $('#processo').attr({"readonly": "readonly"});
                    alert('dados atualizados com sucesso!');
                    ok = false;
                    break;
                }
            }
            if (ok) {
                this.processos.push({prioridade: prioridade, tempo: tempo, processo: processo, limite: limite});
            }
        } else {
            this.processos.push({prioridade: prioridade, tempo: tempo, processo: processo, limite: limite});
        }

        $('#titulo').html('');
        $('#campox').html('');
        $('#botoes').html('');
    }
    iniciarBotao("");
    mostrarP();
}