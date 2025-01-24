self: { lib, pkgs, config, ... }:
let
  inherit (lib) types mkIf mkEnableOption;

  cfg = config.programs.bbrShell;

  jsonFormat = pkgs.formats.json { };

  package = pkgs.bbrShell;

in {
   options.programs.bbrShell = {
    enable = mkEnableOption false;
    autostart = mkEnableOption true;
    overlay = mkEnableOption true;
  };
  # config = lib.mkIf cfg.enable {
  #   nixpkgs.overlays = lib.optionals cfg.overlay.enable [ self.overlay ];
  #   systemd.services.bbrShell = mkIf cfg.autostart {
  #     description = "bbrShell autostart service";
  #     wantedBy = [ "multi-user.target" ]; # Or any target you prefer
  #     serviceConfig.ExecStart = "${package}/bin/bbrShell";  # Adjust with actual path
  #   };
  # };
}
