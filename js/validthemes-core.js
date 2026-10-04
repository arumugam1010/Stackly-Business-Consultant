/*

[Main Script]

Project: Validthemes
Version: 1.0
Author : vecurosoft.com

*/
;(function($){
    "use strict";

    jQuery(window).on( 'elementor/frontend/init', function() {
        // console.log( elementorFrontend);
        if( typeof elementor != "undefined" && typeof elementor.settings.page != "undefined" ) {

            elementor.settings.page.addChangeCallback( 'validthemes_header_style', function ( newValue ) {
                if( newValue == 'prebuilt'  ) {
                    elementor.saver.update({
                        onSuccess: function() {
                            elementor.reloadPreview();
                            elementor.once( 'preview:loaded', function() {
                                elementor.getPanelView().setPage( 'page_settings' ).activateTab('settings');
                            } );
                        }
                    });
                }
            } );
            

            elementor.settings.page.addChangeCallback( 'validthemes_header_builder_option', function ( newValue ) {
                elementor.saver.update({
                    onSuccess: function() {
                        elementor.reloadPreview();
                        elementor.once( 'preview:loaded', function() {
                            elementor.getPanelView().setPage( 'page_settings' ).activateTab('settings');
                        } );
                    }
                });
            } );
            
            elementor.settings.page.addChangeCallback( 'validthemes_footer_style', validthemesFooterStyle );
            function validthemesFooterStyle ( newValue ) {
                elementor.saver.update({
                    onSuccess: function() {
                        elementor.reloadPreview();
                        elementor.once( 'preview:loaded', function() {
                            elementor.getPanelView().setPage( 'page_settings' ).activateTab('settings');
                        } );
                    }
                });
            }
            elementor.settings.page.addChangeCallback( 'validthemes_footer_choice', validthemesFooterChoice );
            function validthemesFooterChoice ( newValue ) {
                elementor.saver.update({
                    onSuccess: function() {
                        elementor.reloadPreview();
                        elementor.once( 'preview:loaded', function() {
                            elementor.getPanelView().setPage( 'page_settings' ).activateTab('settings');
                        } );
                    }
                });
            }

        }
    });

    
    
})(jQuery);