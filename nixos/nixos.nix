{ lib, config, ... }:

let
  bbrShellExecutable = config.inputs.ags.lib.findExecutable config;
in {
  options.programs.bbrShell = {
    enable = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Enable bbrShell as a systemd service.";
    };
  };

  config = lib.mkIf config.programs.bbrShell.enable {
    systemd.services.bbrShell = {
      description = "bbrShell Service";
      after = [ "network.target" "graphical.target" ];
      wants = [ "network.target" "graphical.target" ];
      serviceConfig = {
        ExecStart = "${bbrShellExecutable}/bin/bbrShell";
        Restart = "always";
      };
      wantedBy = [ "multi-user.target" ];
    };
  };
}
