﻿jQuery(document).ready(function($) {
    //BOTON PARA CREAR PAGINA DE AVISO LEGAL
    jQuery("#button_aviso_legal_page").click(function() {
        jQuery("#load_div").addClass("loading");

        var request = jQuery.ajax({
            url: jQuery("#url_base").val() + "pages.php",
            method: "POST",
            data: {
                name_empresa: jQuery("#name_empresa").val(),
                address_empresa: jQuery("#address_empresa").val(),
                cif_empresa: jQuery("#cif_empresa").val(),
                register_empresa: jQuery("#register_empresa").val(),
                domain_empresa: jQuery("#domain_empresa").val(),
                email_empresa: jQuery("#email_empresa").val(),
                title_aviso_legal: jQuery("#title_aviso_legal").val(),
                slug_aviso_legal: jQuery("#slug_aviso_legal").val()
            }
        });

        request.done(function(msg) {
            jQuery("#load_div").removeClass("loading");

            view_messages(msg);
        });
    });

    jQuery("#button_proteccion_datos_page").click(function() {
        jQuery("#load_div").addClass("loading");

        var request = jQuery.ajax({
            url: jQuery("#url_base").val() + "pages.php",
            method: "POST",
            data: {
                name_empresa: jQuery("#name_empresa").val(),
                address_empresa: jQuery("#address_empresa").val(),
                cif_empresa: jQuery("#cif_empresa").val(),
                register_empresa: jQuery("#register_empresa").val(),
                domain_empresa: jQuery("#domain_empresa").val(),
                email_empresa: jQuery("#email_empresa").val(),
                title_proteccion_datos: jQuery("#title_proteccion_datos").val(),
                slug_proteccion_datos: jQuery("#slug_proteccion_datos").val()
            }
        });

        request.done(function(msg) {
            jQuery("#load_div").removeClass("loading");

            view_messages(msg);
        });
    });

    //BOTON PARA CREAR PAGINAS DE COOKIES
    jQuery("#button_cookies_pages").click(function() {
        jQuery("#load_div").addClass("loading");

        var request = jQuery.ajax({
            url: jQuery("#url_base").val() + "pages.php",
            method: "POST",
            data: {
                slug_mas_informacion: jQuery("#slug_mas_informacion").val(),
                slug_politica_cookies: jQuery("#slug_politica_cookies").val(),
                title_politica_cookies: jQuery("#title_politica_cookies").val(),
                title_mas_informacion: jQuery("#title_mas_informacion").val()
            }
        });

        request.done(function(msg) {
            jQuery("#load_div").removeClass("loading");

            view_messages(msg);
        });
    });


    //BOTON PARA INSTALAR EL PLUGINS SELECCIONADO
    jQuery(".install_plugins").click(function() {
        var boton = jQuery(this);

        jQuery("#load_div").addClass("loading");

        var request = jQuery.ajax({
            url: jQuery("#url_base").val() + "zips.php",
            method: "POST",
            data: { plugin_install: jQuery("#val_" + boton.attr("id").substring(8)).val() }
        });

        request.done(function(msg) {
            jQuery("#load_div").removeClass("loading");

            if (msg == "ok") {
                view_messages("Plugin instalado correctamente.")

                boton.css("display", "none");

                jQuery("#mess_" + boton.attr("id").substring(8)).html("Instalado");

            } else
                view_messages("¡Error! No se pudo instalar el plugin.");

        });
    });

    //BOTON PARA CAMBIAR LOS PERMISOS DE LOS FICHEROS
    jQuery("#button_permissions_files").click(function() {
        jQuery("#load_div").addClass("loading");

        var request = jQuery.ajax({
            url: jQuery("#url_base").val() + "scan.php",
            method: "POST",
            data: { change_file_permissions: "OK" }
        });

        request.done(function(msg) {
            jQuery("#load_div").removeClass("loading");

            view_messages(msg);
        });
    });

    //BOTON PARA GENERAR UN BACKUP DE LOS FICHEROS
    jQuery("#button_generate_backup").click(function() {
        jQuery("#load_div").addClass("loading");

        var request = jQuery.ajax({
            url: jQuery("#url_base").val() + "zips.php",
            method: "POST",
            dataType: 'json',
            data: { generate_backup_url: jQuery("#generate_backup_url").val(), old_url_wordpress: jQuery("#url_old_wordpress").val(), new_url_wordpress: jQuery("#url_new_wordpress").val() }
        });

        request.done(function(msg) {
            jQuery("#load_div").removeClass("loading");

            view_messages(msg["message"]);

            jQuery("#backups_table").append(msg["result"]);

            jQuery(".delete_backups").unbind();

            delele_backups_buttons();
        });
    });

    //FUNCION PARA ASIGNAR EL EVENTO DE BORRADO DE FICHEROS DE BACKUPS A LOS BOTONES CORRESPONDIENTES
    function delele_backups_buttons() {
        //BOTON PARA ELIMINAR EL FICHERO DE UN BACKUP
        jQuery(".delete_backups").click(function() {
            if (confirm("¿Estas seguro?")) {
                var boton = jQuery(this);

                jQuery("#load_div").addClass("loading");

                var request = jQuery.ajax({
                    url: jQuery("#url_base").val() + "zips.php",
                    method: "POST",
                    data: { delete_backup_file: boton.attr("id").substring(4) }
                });

                request.done(function(msg) {
                    jQuery("#load_div").removeClass("loading");

                    boton.parent().parent().css("display", "none");
                });
            }
        });
    }

    delele_backups_buttons();

    //SE ASOCIADA EL COLOR PICKER A TODOS LOS INPUT DE TIPO COLOR
    jQuery('input[type=color]').each(function() {

        var element = jQuery(this);

        element.ColorPicker({
            onShow: function(colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function(colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function(hsb, hex, rgb) {
                element.val('#' + hex);
            }
        });

        element.ColorPickerSetColor(element.val());

    });

    //FUNCION PARA MOSTRAR LA VERSION DEL LOGOTIPO DE OPTIMIZACLICK EN EL FOOTER
    jQuery("#optimiza_logo_version").change(function() {

        jQuery("#prev_logo_optimizaclick").css("background-image", 'url("../wp-content/plugins/Optimiza-Plugin-WordPress-master/img/' + jQuery("#optimiza_logo_version").val() + '")');

    });

    //FUNCION PARA MOSTRAR LOS MENSAJES DE LA PAGINA DEL PLUGIN
    function view_messages(msg) {
        jQuery("#messages_plugin").empty();
        jQuery("#messages_plugin").html(msg);
        jQuery("#messages_plugin").fadeIn(200);
        jQuery("#messages_plugin").fadeOut(5000);
    }

    //FUNCION PARA MOSTAR EL CONTENIDO EN PESTAÑAS	
    jQuery(".tab_links").click(function() {
        jQuery(".tab_content").css("display", "none");

        jQuery(jQuery(this).attr("title")).css("display", "block");

        jQuery(".tab_links").removeClass("selected_tab");

        jQuery(this).addClass("selected_tab");
    });

    //FUNCION PARA CARGAR LAS DIMENSIONES DE LA IMAGEN DEL LOGO DE LOGIN
    jQuery('#load_dimensions_logo').click(function() {
        var img = new Image();
        img.src = jQuery('#url_logo_image').val();
        jQuery('#height_login_image').val(img.height);
        jQuery('#width_login_image').val(img.width);
    });

    //BOTON PARA GUARDAR LA CONFIGURACION DEL ADMIN MENU
    jQuery("#save_admin_menu").click(function() {
        jQuery("#load_div").addClass("loading");

        var values = {};

        var checks = jQuery(".admin_menu_check");

        checks.each(function() {

            values[jQuery(this).find(".admin_menu_name").val()] = jQuery(this).find(".value_check:checked").length;

        });

        var request = jQuery.ajax({
            url: jQuery("#url_base").val() + "menu.php",
            method: "POST",
            data: { values: values }
        });

        request.done(function(msg) {
            jQuery("#load_div").removeClass("loading");

            view_messages(msg);
        });
    });


    jQuery("#checked_checkboxes_btn").click(function() {
        jQuery('input[type=checkbox]').prop('checked', true);
    });

    jQuery("#unchecked_checkboxes_btn").click(function() {
        jQuery('input[type=checkbox]').prop('checked', false);
    });

    //BOTON PARA GENERAR UN NUEVO CONTACT FORM
    jQuery("#generate_form").click(function() {
        jQuery("#load_div").addClass("loading");

        var request = jQuery.ajax({
            url: jQuery("#url_base").val() + "form.php",
            method: "POST",
            data: { form_type: jQuery("#contact_form_type").val() }
        });

        request.done(function(msg) {
            jQuery("#load_div").removeClass("loading");

            view_messages(msg);
        });
    });
});