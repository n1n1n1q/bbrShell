{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    ags.url = "github:aylur/ags";
    home-manager.url = "github:nix-community/home-manager";
  };

  outputs = { self, nixpkgs, ags, home-manager }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    homeManagerModules.default = import ./nixos/home-manager.nix;
    
    packages.${system}.default = ags.lib.bundle {
      inherit pkgs;
      src = ./.;
      name = "bbrShell";
      entry = "app.ts";
      gtk4 = false;

      extraPackages = with ags.packages.${system}; [
        battery
        hyprland
        mpris
        network
        wireplumber
        bluetooth
        apps
      ];
    };

    overlays.default = final: prev: {
      bbrShell = self.packages.${system}.default;
    };

    nixosModules.default = import ./nixos/nixos.nix;
  };
}