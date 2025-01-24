{ config, lib, pkgs, ... }:

with lib;

let
  cfg = config.programs.bbrShell;
  package = inputs.self.packages.${system}.default;
in {
  options.programs.bbrShell = {
    enable = mkEnableOption "Enable bbrShell AGS configuration";

    autoStart = mkOption {
      type = types.bool;
      default = true;
      description = "Automatically start bbrShell on login";
    };
  };

  config = mkIf cfg.enable {
    home = {
      packages = [ 
        (cfg.package or null)
        (pkgs.writeShellScriptBin "bbrShell" ''
          ${package}/bin/bbrShell "$@"
        '')
      ];

      # Autostart configuration
      activation = mkIf cfg.autoStart {
        startBbrShell = lib.hm.dag.entryAfter ["writeBoundary"] ''
          ${package}/bin/bbrShell &
        '';
      };
    };

    # Optionally, you can add Hyprland/window manager startup configuration
    wayland.windowManager.hyprland = mkIf cfg.autoStart {
      settings = {
        exec-once = [ "${package}/bin/bbrShell" ];
      };
    };
  };
}