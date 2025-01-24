{ config, lib, pkgs, ... }:

{
  options.programs.bbrShell = {
    enable = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Enable the bbrShell service to start automatically on boot.";
    };
  };

  config = lib.mkIf config.programs.bbrShell.enable {
    # Ensure the executable is available
    environment.systemPackages = [ pkgs.bbrShell ];

    # Define the systemd service
    systemd.services.bbrShell = {
      description = "bbrShell Service";
      wantedBy = [ "default.target" ];
      after = [ "network.target" ];
      serviceConfig = {
        ExecStart = "${pkgs.bbrShell}/bin/bbrShell";
        Restart = "always";
        RestartSec = "5s";
      };
      install = {
        wantedBy = [ "multi-user.target" ];
      };
    };
  };
}
