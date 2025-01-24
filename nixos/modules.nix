{ lib, pkgs, config, ... }:

with lib;

let
  cfg = config.programs.bbrShell;
in
{
  options.programs.bbrShell = {
    enable = mkOption {
      type = types.bool;
      default = false;
      description = "Enable the bbrShell program and configure its startup.";
    };
  };

  config = mkIf cfg.enable {
    systemd.services.bbrShell = {
      description = "bbrShell program";
      wantedBy = [ "multi-user.target" ];
      serviceConfig = {
        ExecStart = "${pkgs.runtimeShell}/bin/bash -c 'cd /path/to/bbrShell && ./bbrShell'";
        Restart = "always";
        WorkingDirectory = "/path/to/bbrShell";
      };
    };

    environment.systemPackages = [
      pkgs.nodejs
    ];
  };
}
