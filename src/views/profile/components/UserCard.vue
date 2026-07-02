<template>
  <el-card style="margin-bottom: 20px">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <el-form>
        <div class="box-center">
          <!-- <pan-thumb
            :image="user_avatar"
            :height="'100px'"
            :width="'100px'"
            :hoverable="false"
          >
          </pan-thumb> -->
          <el-image
            class="rounded-full"
            :src="user_avatar"
            :fit="contain"
            @error="$event.target.src = logo"
          />
        </div>
      </el-form>
      <div class="box-center">
        <div class="user-name text-center">{{ user_name }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="change-avatar user-bio-section">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <div class="user-bio-section-header flex items-center">
                <svg-icon icon-class="user" />

                <span>{{ $t("change_user_info") }}</span>
              </div>
            </template>
            <el-menu-item-group>
              <div class="user-bio-section-body">
                <el-form
                  class="changename-form"
                  autocomplete="on"
                  label-position="left"
                >
                  <div class="progress-item">
                    <div class="clearfix flex flex-col items-center">
                      <div class="w-full my-4 text-md">
                        {{ $t("user_avatar") }}
                      </div>
                      <el-link :underline="false" @click="onChangeAvatarClick">
                        <el-image
                          :src="user_avatar"
                          :fit="contain"
                          @error="$event.target.src = logo"
                        />
                      </el-link>
                      <div v-if="imageError" class="imageError">
                        {{ imageError }}
                      </div>
                      <div class="w-full my-4 text-md">
                        {{ $t("username_info") }}
                      </div>
                      <el-input
                        v-model="user_name"
                        :placeholder="$t('username_info')"
                      />
                      <el-button
                        :loading="loading_button"
                        class="my-4 w-full"
                        @click="user_update_info"
                      >{{ $t("update_info") }}</el-button>
                    </div>
                  </div>
                </el-form>
              </div>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <my-upload
      ref="refCrop"
      :model-value="is_show_crop"
      field="img"
      :width="300"
      :height="300"
      img-format="png"
      lang-type="en"
      type="file"
      accept="image/*"
      @change="selectedFile"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      @update:modelValue="offDialogUpload"
    />
  </el-card>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import config_network from "/src/networking/network_config";
// import { updateProfile } from "@/api/user";
import user_info from "@/api/user";

const MAX_SIZE = 100000;
const MAX_WIDTH = 500;
const MAX_HEIGHT = 300;
export default {
  components: { "my-upload": myUpload },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          email: "",
          avatar: "",
          role: "",
          old_name: "",
          old_avatar: "",
        };
      },
    },
  },
  data() {
    return {
      loading_button: false,
      old_password: "",
      new_password: "",
      reset_password: "",
      user_name: "",
      user_avatar: "",
      user_role: "",
      is_show_crop: false,
      contain: "contain",
      url_upload: config_network.url + "/api/public/post",
      logo: require("@/assets/default.png"),
      image: {
        size: "",
        height: "",
        width: "",
      },
      imageError: "",
      raw_img_url: "",
      is_new_avatar: false,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    // updateProfile,
    trigger_notify(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "success",
      });
    },
    trigger_error(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "error",
      });
    },
    selectedFile() {
      this.imageError = "";

      const file = this.$refs.refCrop.files.pop();

      console.log("..............chon file la : ", file);

      if (!file || file.type.indexOf("image/") !== 0) return;
      this.image.size = file.size;
      if (this.image.size > MAX_SIZE) {
        this.imageError = `The image size (${this.image.size}) is too much (max is ${MAX_SIZE}).`;
        return;
      }

      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        const img = new Image();
        img.onload = () => {
          this.image.width = img.width;
          this.image.height = img.height;
          console.log(this.image);
          if (this.image.width > MAX_WIDTH) {
            this.imageError = `The image width (${this.image.width}) is too much (max is ${MAX_WIDTH}).`;
            return;
          }
          if (this.image.height > MAX_HEIGHT) {
            this.imageError = `The image height (${this.image.height}) is too much (max is ${MAX_HEIGHT}).`;
            return;
          }
        };
        img.src = evt.target.result;
      };

      reader.onerror = (evt) => {
        console.error(evt);
      };
    },
    handleUploadImageSuccess(response, file) {
      const object = { ...response, ...{ remove: 0 }};
      this.$emit("onSetUrlImage", object);
      this.dialogImageUrl = response.name;
    },
    onChangeAvatarClick() {
      this.is_show_crop = true;
    },
    offDialogUpload(value) {
      console.log("........................off popup", value);
      this.is_show_crop = value;
    },
    cropSuccess(user_avatar, field) {
      console.log("-------- crop success --------", field);
      this.is_show_crop = false;
      this.user_avatar = user_avatar;
      this.is_new_avatar = true;
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
    getUser() {
      user_info().then(({ data }) => {
        console.log(data, "............user info");
        this.user_name = data.username;
        this.user_avatar = data.avatar;
        this.raw_img_url = this.user_avatar;
        //console.log(res, "............user info");
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      console.log(".....................cho nay");
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    convert_base64(base64Image) {
      const base64String = base64Image.replace(/^data:image\/\w+;base64,/, "");
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return byteArray;
    },
    // update_info(formData) {
    //   this.loading_button = true;
    //   this.updateProfile(formData)
    //     .then((res) => {
    //       this.trigger_notify("Cập nhật thông tin thành công")
    //       console.log(res, "............update user info");
    //     })
    //     .catch((error) => {
    //       this.trigger_error("An error occur")
    //       console.log(error, "............update user info");
    //     })
    //     .finally(() => {
    //       this.loading_button = false;
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 1000);
    //     });
    // },
    user_update_info() {
      const formUpdateUser = new FormData();
      console.log("is_new_avatar", this.is_new_avatar);
      formUpdateUser.append("user_name", this.user_name);
      if (this.is_new_avatar) {
        const blob = new Blob([this.convert_base64(this.user_avatar)], {
          type: "image/jpeg",
        });
        const formData = new FormData();
        formData.append("image", blob, "image.jpg");

        fetch("https://shop.vcallid.com/api/public/post_cdn", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            console.log(response, "............upload image");
            if (response.ok) {
              return response.text();
            }
            throw new Error("Failed to upload image");
          })
          .then((data) => {
            this.raw_img_url = JSON.parse(data).name;
            formUpdateUser.append("avt_url", this.raw_img_url);
            this.update_info(formUpdateUser);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
            this.trigger_error("An error occur");
          });
      } else {
        this.update_info(formUpdateUser);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}

.el-menu {
  border-right: none;
}

.user-bio-section-body {
  margin: 0 20px;
}
.el-image {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
}
</style>
