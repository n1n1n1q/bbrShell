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
        pkgs.gjs
        pkgs.gtk4
        pkgs.libadwaita
        (pkgs.writeShellScriptBin "bbrShell" ''
          ${cfg.package}/bin/bbrShell "$@"
        '')
      ];
    };

    systemd.user.services.bbrShell = mkIf cfg.autoStart {
      Unit = {
        Description = "bbrShell AGS Shell";
        PartOf = [ "graphical-session.target" ];
        After = [ "graphical-session.target" ];
      };

      Service = {
        ExecStart = "${cfg.package}/bin/bbrShell";
        Restart = "on-failure";
        RestartSec = 5;
      };

      Install = {
        WantedBy = [ "graphical-session.target" ];
      };
    };
  };
}