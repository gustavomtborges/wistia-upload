;(function () {
  'use strict'
  angular.module('app', [])
    .controller('UploadController', UploadController)
    .directive('wistiaUpload', WistiaUpload)

  function UploadController ($scope, $http, $sce) {
    var controller = this

    controller.started = false

    controller.startUpload = function () {
      controller.started = true
      $('#fileupload').fileupload({
        url: 'https://upload.wistia.com/',
        dataType: 'json',
        done: function (e, data) {
          controller.videoId = data.result.hashed_id
          controller.videoUrl = '//fast.wistia.com/embed/medias/' + controller.videoId + '.jsonp'
          $sce.trustAsUrl(controller.videoUrl)
          controller.videoName = data.result.name
          controller.started = false
          controller.videoDone = true
          $scope.$apply()
        },
        progressall: function (e, data) {
          controller.progress = parseInt(data.loaded / data.total * 100, 10)
          $('.progress-bar').css('width', controller.progress + '%')
        },
        formData: {api_password: '392f8c278859df78c52b19da0f82910e112c02a865eeccb85461bef8b83e3a7d'}
      })
    }
  }

  function WistiaUpload () {
    return {
      restrict: 'E',
      controller: 'UploadController',
      controllerAs: 'uploadCtrl',
      template: '<div class="container" style="margin-top: 5em">' +
          '<div class="row">' +
          '    <div class="col-lg-10 col-lg-offset-1">' +
          '        <div class="panel panel-default">' +
          '            <div class="panel-heading">Video Upload</div>' +
          '            <div class="panel-body">' +
          '                <span class="btn btn-primary fileinput-button">' +
          '                    <i class="glyphicon glyphicon-plus"></i>' +
          '                    <span>Select video...</span>' +
          '                <input id="fileupload" type="file" name="files" ng-click="uploadCtrl.startUpload()">' +
          '                </span>' +
          '                <br />' +
          '                <br />' +

          '                <div ng-show="uploadCtrl.started">' +
          '                    <div class="progress">' +
          '                        <div class="progress-bar" role="progressbar" aria-valuenow="{{uploadCtrl.progress}}" aria-valuemin="0" aria-valuemax="100">' +
          '                        </div>' +
          '                    </div>' +
          '                </div>' +

          '            </div>' +
          '        </div>' +
          '    </div>' +
          '</div>' +
          '<hr />' +
          '<div class="row">' +
          '    <div class="col-lg-10 col-lg-offset-1">' +
          '      <div ng-show="uploadCtrl.videoDone">' +
          '        <script src="{{uploadCtrl.videoUrl}}" async></script>' +
          '        <script src="//fast.wistia.com/assets/external/E-v1.js" async></script>' +
          '        <div class="wistia_embed wistia_async_{{uploadCtrl.videoId}}" style="height:361px;width:640px">&nbsp;</div>' +
          '      </div>' +
          '    </div>' +
          '    <script src="//fast.wistia.com/embed/medias/xej5allksp.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_embed wistia_async_xej5allksp" style="height:361px;width:640px">&nbsp;</div>' +
          '</div>' +
      '</div>'
    }
  }
})()
