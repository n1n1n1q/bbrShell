{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    ags.url = "github:aylur/ags";
  };

  outputs = { self, nixpkgs, ags }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in rec {
   packages.${system} = {
      default = ags.lib.bundle {
        inherit pkgs;
        src = ./.;
        name = "bbrShell";
        entry = "app.ts";
        gtk4 = false;

        extraPackages = [
          ags.packages.${system}.battery
          ags.packages.${system}.hyprland
          ags.packages.${system}.mpris
          ags.packages.${system}.network
          ags.packages.${system}.wireplumber
          ags.packages.${system}.bluetooth
          ags.packages.${system}.apps
          ags.packages.${system}.notifd
        ];
      };
    };

    overlay = final: prev: {
      bbrShell = prev.writeShellScriptBin "bbrShell" ''
        if [ "$#" -eq 0 ]; then
            exec ${self.packages.${final.stdenv.system}.default}/bin/bbrShell
        else
            exec ${ags.packages.${final.stdenv.system}.io}/bin/astal -i bbrShell "$*"
        fi
      '';
    };
    homeManagerModules.bbrShell = import ./nixos/module.nix self;
  };
}
