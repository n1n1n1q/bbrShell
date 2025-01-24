{ config, lib, pkgs, inputs, ... }:
with lib;
let
  cfg = config.programs.bbrShell;
in {
  options.programs.bbrShell = {
    enable = mkEnableOption "Enable bbrShell AGS configuration";
    
    package = mkOption {
      type = types.package;
      default = inputs.bbrShell.packages.${pkgs.system}.default;
      description = "bbrShell package to use";
    };

    autoStart = mkOption {
      type = types.bool;
      default = true;
      description = "Automatically start bbrShell on login";
    };
  };

  config = mkIf cfg.enable {
    home = {
      packages = [ 
        cfg.package
        (pkgs.writeShellScriptBin "bbrShell" ''
          ${cfg.package}/bin/bbrShell "$@"
        '')
      ];

      # Autostart configuration
      activation = mkIf cfg.autoStart {
        startBbrShell = lib.hm.dag.entryAfter ["writeBoundary"] ''
          ${cfg.package}/bin/bbrShell &
        '';
      };
    };

    # Optionally, you can add Hyprland/window manager startup configuration
    # wayland.windowManager.hyprland = mkIf cfg.autoStart {
    #   settings = {
    #     exec-once = [ "${cfg.package}/bin/bbrShell" ];
    #   };
    # };
  };
}
