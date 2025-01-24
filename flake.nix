{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    ags.url = "github:aylur/ags";
    home-manager.url = "github:nix-community/home-manager";
  };

  outputs = { self, nixpkgs, ags, home-manager }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in rec {
    packages.${system}.default = ags.lib.bundle {
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
      ];
    };

    # NixOS module
    nixosModules = {
      programs = import ./nixos/nixos.nix;
    };
    homeManagerModules.bbrShell = import ./nixos/home-manager.nix;
    homeConfigurations.default = home-manager.lib.homeManagerConfiguration {
      inherit system pkgs;
      modules = [ self.homeManagerModules.bbrShell ];
    };
  };
}
