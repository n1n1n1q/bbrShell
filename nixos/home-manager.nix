{ config, lib, pkgs, ... }:

with lib;

let
  cfg = config.programs.bbrShell;
in
{
  options.programs.bbrShell = {
    enable = mkOption {
      type = types.bool;
      default = false;
      description = "Enable the bbrShell program in Home Manager.";
    };

    startupArgs = mkOption {
      type = types.str;
      default = "";
      description = "Arguments to pass to bbrShell on startup.";
    };
  };

  config = mkIf cfg.enable {
    home.packages = [
      pkgs.nodejs
    ];

    systemd.user.services.bbrShell = {
      description = "bbrShell program";
      wantedBy = [ "default.target" ];
      serviceConfig = {
        ExecStart = "${config.home.sessionPath}/bin/bash -c 'cd ${pkgs.bbrShell}/bin && ./bbrShell ${cfg.startupArgs}'";
        Restart = "always";
      };
    };
  };
}
