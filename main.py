#import dependencies

import os
import zipfile
import requests
import py7zr

gitrepo = "https://github.com/QEXLAUWASD/AKIUpdater.git"
if __name__ == "__main__":
    # from github repo  download the client zip file and extract it to the same directory
    # check if the file not exists
    if not os.path.exists("Client.0.16.1.0.34720.zip") and not os.path.exists("EscapeFromTarkov_Data"):
        print("Downloading the client")
        requests.get("https://cdn-11.eft-store.com/eft/client/live/distribs/0.16.1.0.34720_253ea775-2a58-4dd5-accc-b1f42928c862/Client.0.16.1.0.34720.zip")
        print("Downloaded the client")
        # extract the file
        print("Extracting the client")
        with zipfile.ZipFile("Client.0.16.1.0.34720.zip", 'r') as zip_ref:
            zip_ref.extractall()
        print("Extracted the client")
        #patch the game
        print("Patching the game")
        requests.get("https://spt-mirror.refringe.com/patchers/Patcher_16.1.0.34720_to_15.5.1.33420.7z")
        # extract the file
        print("Extracting the patcher")
        with py7zr.SevenZipFile("Patcher_16.1.0.34720_to_15.5.1.33420.7z", mode='r') as z:
            z.extractall()
        print("Extracted the patcher")
        # run the patcher
        os.system("SPT.Launcher.exe")
        print("Patched the game")
        # remove the zip file
        os.remove("client.zip")
        os.remove("Patcher_16.1.0.34720_to_15.5.1.33420.7z")
    else:
        print("The client.zip already exists")
        # check if the file EscapeFromTarkov_Data exists
        if os.path.exists("EscapeFromTarkov_Data"):
            print("The client already installed")
    # check the version.txt file in the same directory

    # install SP-Tarkov Server from github repo and extract it to the same directory 
    # check if the file not exists
    if not os.path.exists("SPT-3.10.5-33420-51869ce.7z") and not os.path.exists("SPT.Launcher.exe"):
        print("Downloading the server")
        requests.get("https://spt-releases.modd.in/SPT-3.10.5-33420-51869ce.7z")
        print("Downloaded the server")
        # extract the file
        print("Extracting the server")
        with py7zr.SevenZipFile("SPT-3.10.5-33420-51869ce.7z", mode='r') as z:
            z.extractall()
        print("Extracted the server")
        # remove the zip file
        os.remove("Server.zip")
    else:
        print("The Server.zip already exists")
        # check if the file SPT.Launcher.exe exists
        if os.path.exists("SPT.Launcher.exe"):
            print("The server already installed")
        else:
            with open("Server.zip", "r") as zip_ref:
                zip_ref.extractall()    
            print("The server installed")
    

    # check the version.txt file in the same directory
    with open("version.txt", "r") as f:
        version = f.read()
    # check the version from github
    url = "https://raw.githubusercontent.com/QEXLAUWASD/AKIUpdater/main/version.txt"
    # check if the version is the same
    if version != url:
        # download new version
        print("Downloading new version")
        os.system(f"git clone {gitrepo}")
        print("Downloaded new version")
    else:
        print("You have the latest version")
        exit(0)

